// Require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Require classes
const Departments = require('./lib/department');
const Employees = require('./lib/employee');
const Roles = require('./lib/role');

// Variables for tables from database
let rolesTable;
let departmentsTable;
let employeesTable;

// Question arrays for inquirer prompts
const initialPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initialChoices',
        choices: [
            {
                name: 'View all departments',
                value: 'viewDepartments'
            },
            {
                name: 'View all roles',
                value: 'viewRoles'
            },
            {
                name: 'View all employees',
                value: 'viewEmployees'
            },
            {
                name: 'Add a department',
                value: 'addDepartment'
            },
            {
                name: 'Add a role',
                value: 'addRole'
            },
            {
                name: 'Add an employee',
                value: 'addEmployee'
            },
            {
                name: 'Update a role',
                value: 'updateRole'
            },
            {
                name: 'Exit',
                value: 'exitApp'
            }
        ]
    }
];

const addDepartmentPropmpt = {
    type: 'input',
    message: 'What is the new department\'s name?',
    name: 'deptName'
};

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'What is the first name of the employee?',
        name: 'fName'
    },
    {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'lName'
    },
    {
        type: 'list',
        message: 'What is the current role ID of the employee?',
        name: 'roleID',
        choices: [1, 2, 3, 4, 5, 6]
    },
    {
        type: 'list',
        message: 'What is the employee\'s manager\'s ID?',
        name: 'managerID',
        choices: [1, 3, 5]
    }
];

const addRolePrompt = [
    {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'What is the salary of the new role? (Whole numbers only)',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'What is the department ID the new role belongs to?',
        name: 'departmentID',
        choices: [1, 2, 3]
    }
];

const updateRolePrompt = [
    {
        type: 'list',
        message: 'Which employee\'s role would you like to update?',
        name: 'employeeID',
        choices: [1, 2, 3, 4, 5, 6]
    },
    {
        type: 'list',
        message: 'What is the new role of the employee?',
        name: 'roleID',
        choices: [1, 2, 3, 4, 5, 6]
    }
];

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
    
    // Map data from departments table to an object variable
    connection.query('select * from departments', (err, res) => {
        departmentsTable = res.map(departments => ({name: departments.name, value: departments.id}))
    })

    // Map data from employees table to an object variable
    connection.query('select * from employees', (err, res) => {
        employeesTable = res.map(employees => ({name: `${employees.f_name} ${employees.l_name}`, value: employees.id}))
    })

    // Map data from roles table to an object variable
    connection.query('select * from roles', (err, res) => {
        rolesTable = res.map(roles => ({name: roles.name, value: roles.id}))
    })

    connection.end();
});