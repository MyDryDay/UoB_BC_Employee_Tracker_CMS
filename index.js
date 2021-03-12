// Require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Require classes
const Departments = require('./lib/department');
const Employees = require('./lib/employee');
const Roles = require('./lib/role');

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
                // Call addRole() function
                break;

            case "Add an employee":
                // Call addEmployee() function
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
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the new department\'s name?',
            name: 'name'
        }
    ).then((answer) => {
        let newDept = new Departments(answer);
        let query = 'insert into departments set ?';
        connection.query(query, [newDept.name], (err, res) => {
            if(err) throw err;
            initialPrompt();
        });
    });
}

