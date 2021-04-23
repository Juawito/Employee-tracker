const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Santi234'",
    database: 'juawitos_companyDB'
});

const start = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Would you like to [SEARCH] or [ADD] to the database?',
        choices: ['SEARCH', 'ADD', 'EXIT'],
    })
        .then((res) => {
            switch (res.action) {
                case 'SEARCH':
                    typeOfSearch()
                    break;
                case 'ADD':
                    addToDB()
                    break;
                case 'EXIT':
                    connection.end()
                    break;

            }
        });
}
const typeOfSearch = () => {
    inquirer.prompt({
        name: 'searchAction',
        type: 'list',
        message: 'What would you like to search for?',
        choices: ['Employee', 'Department', 'Role', 'EXIT']
    })
        .then((res) => {
            switch (res.searchAction) {
                case 'Employee':
                    searchEmp();
                    break;
                case 'Department':
                    searchDep();
                    break;
                case 'Role':
                    searchByRole();
                    break;
                case 'EXIT':
                    connection.end();
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
                    addEmp();
                    break;
                case 'Manager':
                    addEmp()
                    break;
                case 'Department':
                    addDep();
                    break;
                case 'Role':
                    addRole();
                    break;
                case 'EXIT':
                    connection.end();
                    break;
            }
        })
}
// let query = '';
// switch (res) {
//     case 'Employee': 
//     let query = 'SELECT * FROM employee WHERE '
// }
connection.connect((err) => {
    if (err) throw err;
    start();
});