// Require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Require classes
const Departments = require('./lib/department');
const Employees = require('./lib/employee');
const Roles = require('./lib/role');

// Establish connection to server
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw error;
    console.log(`Connected as ID: ${connection.threadId}`);
    connection.end();
});