const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const figlet = require('figlet')
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.USER_PASS,
    database: process.env.DB_NAME
});

const start = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Would you like to [SEARCH], [ADD] or [UPDATE] to the database?',
        choices: ['SEARCH', 'ADD', 'UPDATE', 'EXIT'],
    })
        .then((res) => {
            switch (res.action) {
                case 'SEARCH':
                    search()
                    break;
                case 'ADD':
                    addToDB()
                    break;
                case 'UPDATE':
                    updateDB();
                    break;
                case 'EXIT':
                    connection.end()
                    break;

            }
        });
}
const allData = () => {
    let query = 'SELECT * FROM employee INNER JOIN emp_role On employee.role_id = emp_role.id INNER JOIN department On emp_role.department_id = department.id'
    connection.query(query, (error, result) => {
        if (error) throw error;
        console.table(result);
    })
}
const search = () => {
    inquirer.prompt({
        name: 'searchAction',
        type: 'list',
        message: 'What would you like to search for?',
        choices: ['ALL', 'Employee', 'Department', 'Role', 'MAIN MENU', 'EXIT']
    })
        .then((res) => {
            switch (res.searchAction) {
                case 'ALL':
                    allData();
                    askAgain();
                    break;
                case 'Employee':
                    query = 'SELECT * FROM employee WHERE employee.first_name = ? AND employee.last_name = ?'
                    inquirer.prompt([
                        {
                            name: 'empFirst',
                            type: 'input',
                            message: 'What is the First Name of the employee that you would like to search for?'
                        },
                        {
                            name: 'empLast',
                            type: 'input',
                            message: 'What is the Last Name of the employee that you would like to search for?'
                        }
                    ])
                        .then((res) => {
                            console.log(res)
                            connection.query(query,
                                [
                                    res.empFirst,
                                    res.empLast
                                ], (err, result) => {
                                    if (err) throw err;
                                    console.table(result);
                                    askAgain();
                                })
                        })
                    break;
                case 'Department':
                    query = 'SELECT * FROM department WHERE department.department_name = ?'
                    inquirer.prompt({
                        name: 'depname',
                        type: 'input',
                        message: 'What is the Name of the department that you would like to search for?'
                    })
                        .then((res) => {
                            connection.query(query, [res.depname], (err, result) => {
                                if (err) throw err;
                                console.table(result);
                                askAgain();
                            })
                        })
                    break;
                case 'Role':
                    query = 'SELECT * FROM emp_role WHERE emp_role.title = ?'
                    inquirer.prompt({
                        name: 'roleTitle',
                        type: 'input',
                        message: 'What is the Title of the role that you would like to search for?'
                    })
                        .then((res) => {
                            connection.query(query, [res.roleTitle], (err, result) => {
                                if (err) throw err;
                                console.table(result);
                                askAgain();
                            })
                        })
                    break;
                case 'EXIT':
                    connection.end();
                    break;
            }
        })
}
const askAgain = () => {
    inquirer.prompt({
        name: 'nextAction',
        type: 'list',
        message: 'What would you like to do next?',
        choices: ['MAIN MENU', 'SEARCH AGAIN', 'ADD ANOTHER', 'EXIT']
    })
        .then((res) => {
            switch (res.nextAction) {
                case 'MAIN MENU':
                    start()
                    break;
                case 'SEARCH AGAIN':
                    search()
                    break;
                case 'ADD ANOTHER':
                    addToDB();
                    break;
                case 'EXIT':
                    connection.end()
                    break;
            }
        })
}
const addToDB = () => {
    inquirer.prompt({
        name: 'addCriteria',
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Employee', 'Manager', 'Department', 'Role', 'EXIT']
    })
        .then((res) => {
            switch (res.addCriteria) {
                case 'Employee':
                    let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) ';
                    inquirer.prompt([
                        {
                            name: 'first_name',
                            type: 'input',
                            message: 'What is the first name of the employee?'
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'What is the last name of the employee?'
                        },
                        {
                            name: 'role_id',
                            type: 'input',
                            message: 'What is the roleId for the employee?'
                        },
                        {
                            name: 'manager_id',
                            type: 'input',
                            message: "What is the ID for the employee's manager?"
                        }
                    ])
                        .then((res) => {
                            console.log(res);
                            let query = `INSERT INTO employee SET ?`;
                            connection.query(query, res,(err, result) => {
                                if (err) throw err;
                                console.table(result);
                                askAgain();
                            })
                        })
                    break;
                case 'Manager':
                    inquirer.prompt([
                        {
                            name: 'first',
                            type: 'input',
                            message: 'What is the first name of the employee?'
                        },
                        {
                            name: 'last',
                            type: 'input',
                            message: 'What is the last name of the employee?'
                        },
                        {
                            name: 'managerID',
                            type: 'input',
                            message: "What is the ID for the employee's manager?"
                        }
                    ])
                        .then((res) => {
                            query += `VALUES (${res.first}, ${res.last}, ${res.roleID}, ${res.managerID})`;
                            connection.query(query, (err, res) => {
                                console.table(res);
                                askAgain();
                            })
                        })
                    break;
                case 'Department':
                    inquirer.prompt([
                        {
                            name: 'department_name',
                            type: 'input',
                            message: 'What the name of the New Department?'
                        }
                    ])
                        .then((res) => {
                            let query = 'INSERT INTO department SET ? ';
                            connection.query(query, res, (err, result) => {
                                console.table(result);
                                askAgain();
                            })
                        })
                    break;
                case 'Role':
                    inquirer.prompt([
                        {
                            name: 'title',
                            type: 'input',
                            message: 'What the name of the New Role?'
                        },
                        {
                            name: 'salary',
                            type: 'input',
                            message: 'What is the salary for this role?'
                        },
                        {
                            name: 'department_id',
                            type: 'input',
                            message: 'What is the Department ID for this role?'
                        }
                    ])
                        .then((res) => {
                            let query = 'INSERT INTO emp_role SET ?';
                            connection.query(query, res, (err, result) => {
                                console.table(result);
                                askAgain();
                            })
                        })
                    break;
                case 'EXIT':
                    connection.end();
                    break;
            }
        })
}
const updateDB = () => {
    inquirer.prompt({
        name: 'updateAction',
        type: 'list',
        message: 'What would you like to update?',
        choices: ['EMPLOYEE']
    })
        .then((res) => {
            switch (res.updateAction) {
                case 'EMPLOYEE':
                    inquirer.prompt({
                        name: 'updateEmp',
                        type: 'list',
                        message: 'What would youlike to update?',
                        choices: ['ROLE', 'MANAGER']
                    })
                        .then((res) => {
                            switch (res.updateEmp) {
                                case 'ROLE':
                                    allData();
                                    inquirer.prompt([
                                        {
                                            name: 'empId',
                                            type: 'input',
                                            message: 'What is the Employee ID?'
                                        },
                                        {
                                            name: 'newRole',
                                            type: 'input',
                                            message: "What is the Id of the Employee's New Role?"
                                        },
                                    ])
                                        .then((res) => {
                                            connection.query(
                                                'Update employee SET ? WHERE ?',
                                                [
                                                    {
                                                        role_id: res.newRole,
                                                    },
                                                    {
                                                        id: res.empId,
                                                    },
                                                ],
                                                (error) => {
                                                    if (error) throw error;
                                                    console.log('Updated employee succesfully')
                                                }
                                            )
                                        })
                            }
                        })
                    break;
            }
        })
}
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`)
    figlet('EMPLOYEE TRACKER', (err, data) => {
        if (err) throw err;
        console.log(data);
        start();
    })
});