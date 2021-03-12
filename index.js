// Require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Require classes
const Departments = require('./lib/department');
const Employees = require('./lib/employee');
const Roles = require('./lib/role');

let deptTable;
let roleTable;
let employeeTable;

// Config variable for the connection
const connectionConfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db',
}

// Creating connection
const connection = mysql.createConnection(connectionConfig);

// Establish connection to server
connection.connect((err) => {
    if (err) throw error;
    console.log(`Connected as ID: ${connection.threadId}`);

    connection.query('select * from departments', (err, res) => {
        deptTable = res.map(departments => ({name: departments.name, value: departments.id}))
    })
    connection.query('select * from roles', (err, res) => {
        roleTable = res.map(roles => ({name: roles.title, value: roles.id}))
    })
    connection.query('select * from employees', (err, res) => {
        employeeTable = res.map(employees => ({name: `${employees.f_name} ${employees.l_name}`, value: employees.id}))
    })

    initialPrompt();
    // connection.end();
});

// Main prompt 
const initialPrompt = () => {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'initialChoices',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update a role",
            "Exit"
        ]
    }).then((answer) => {
        switch(answer.initialChoices){
            case "View all departments":
                allDept();
                break;

            case "View all roles":
                allRoles();
                break;

            case "View all employees":
                allEmployees();
                break;

            case "Add a department":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Exit":
                // Call exit() function
                break;
        }
    });
}

// Function to display all departments within the database
const allDept = () => {
    // Holds the query we'll make to the database
    let query = 'select * from departments';

    // Sends the query, prints the response & calls initialPrompt
    // Or throws an error
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);

        initialPrompt();
    });
}

// Function to display all roles within the database
const allRoles = () => {
    let query = 'select * from roles';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);

        initialPrompt();
    });
}

// Function to display all employees within the database
const allEmployees = () => {
    let query = 'select * from employees';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);

        initialPrompt();
    });
}

const addDept = () => {
    // Prompt the user for the department's name
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the new department\'s name?',
            name: 'name'
        }
    ).then((answer) => {
        // Create new Deapartments object
        let newDept = new Departments(answer);
        // Add the query with a placeholder for the department name (?)
        let query = 'insert into departments set ?';
        // Send the query to the server
        connection.query(query, [newDept.name], (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the new role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary for the new role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does the new role belong to?',
            choices: deptTable,
            name: 'department_id'
        }
    ]).then((title, salary, department_id) => {
        let newRole = new Roles(title, salary, department_id);
        let query = 'insert into roles set ?';
        connection.query(query, [newRole.title, newRole.salary, newRole.department_id], (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the new employee?',
            name: 'f_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the new employee?',
            name: 'l_name'
        },
        {
            type: 'list',
            message: 'What role is the new employee taking on?',
            choices: roleTable,
            name: 'role_id'
        },
        {
            type: 'list',
            message: 'Who is the new employee\'s manager?',
            choices: employeeTable,
            name: 'manager_id'
        }
    ]).then((f_name, l_name, role_id, manager_id) => {
        let newEmployee = new Employees(f_name, l_name, role_id, manager_id);
        let query = 'insert into employees set ?';
        connection.query(query, [newEmployee.f_name, newEmployee.l_name, newEmployee.role_id, newEmployee.manager_id], (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}