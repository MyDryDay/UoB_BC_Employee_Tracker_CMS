// Require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Require classes
const Departments = require('./lib/department');
const Employees = require('./lib/employee');
const Roles = require('./lib/role');

// Defining database table variables
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
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);

    // connection.query('select * from departments', (err, res) => {
    //     deptTable = res.map(departments => ({name: departments.name, value: departments.id}))
    // })
    // connection.query('select * from roles', (err, res) => {
    //     roleTable = res.map(roles => ({name: roles.title, value: roles.id}))
    // })
    // connection.query('select * from employees', (err, res) => {
    //     employeeTable = res.map(employees => ({name: `${employees.f_name} ${employees.l_name}`, value: employees.id}))
    // })

    updateDeptVar();
    updateRoleVar();
    updateEmployeeVar();
    initialPrompt();
    // connection.end();
});

// SQL queries to update database table variables
const updateDeptVar = () => {
    connection.query('select * from departments', (err, res) => {
        deptTable = res.map(departments => ({name: departments.name, value: departments.id}))
    });
}

const updateRoleVar = () => {
    connection.query('select * from roles', (err, res) => {
        roleTable = res.map(roles => ({name: roles.title, value: roles.id}))
    });
}

const updateEmployeeVar = () => {
    connection.query('select * from employees', (err, res) => {
        employeeTable = res.map(employees => ({name: `${employees.f_name} ${employees.l_name}`, value: employees.id}))
    });
}

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
            "Update an employee's role",
            "Delete a department",
            "Delete a role",
            "Delete an employee\'s records",
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

            case "Update an employee's role":
                updateRole();
                break;

            case "Delete a department":
                deleteDept();
                break;

            case "Delete a role":
                deleteRole();
                break;

            case "Delete an employee\'s records":
                deleteEmployee();
                break;

            case "Exit":
                exit();
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

        updateDeptVar();
        initialPrompt();
    });
}

// Function to display all roles within the database
const allRoles = () => {
    let query = 'select * from roles';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);

        updateRoleVar();
        initialPrompt();
    });
}

// Function to display all employees within the database
const allEmployees = () => {
    let query = 'select * from employees';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);

        updateEmployeeVar();
        initialPrompt();
    });
}

// Function to add a department to the database's departments table
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

// Function to add a role to the database's roles table
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

// Function to add an employee to the database's employees table
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

// Function to update a role that exists in the databse's roles table
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee\'s role would you like to update?',
            choices: employeeTable,
            name: 'employee_id'
        },
        {
            type: 'list',
            message: 'Which new role would you like to assign to this employee?',
            choices: roleTable,
            name: 'role_id'
        }
    ]).then((res) => {
        let query = `update employees set role_id = ${res.role_id} where id = ${res.employee_id}`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

// Function to delete a department that exists in the database's departments table
const deleteDept = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Which department would you like to delete?',
            choices: deptTable,
            name: 'department_id'
        }
    ).then((res) => {
        let query = `delete from departments where id = ${res.department_id}`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

// Function to delete a role that exists in the database's roles table
const deleteRole = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Which role would you like to delete?',
            choices: roleTable,
            name: 'role_id'
        }
    ).then((res) => {
        let query = `delete from roles where id = ${res.role_id}`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

// Function to delete an employee's records that exist in the databse's employee table
const deleteEmployee = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Which employee\'s records would you like to delete?',
            choices: employeeTable,
            name: 'employee_id'
        }
    ).then((res) => {
        let query = `delete from employees where id = ${res.employee_id}`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

// Function to exit out of the application
const exit = () => {
    connection.end();
}
