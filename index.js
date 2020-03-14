// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Database connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Keys603!",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

// Main inquirer menu
function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you ike to do?",
      name: "choices",
      choices: [
        {
          name: "View all employees",
          value: "viewEmployees"
        },
        {
          name: "View all departments",
          value: "viewDepartments"
        },
        {
          name: "View all roles",
          value: "viewRoles"
        },
        {
          name: "Add employee",
          value: "addEmployee"
        },
        {
          name: "Add department",
          value: "addDepartment"
        },
        {
          name: "Add role",
          value: "addRole"
        },
        {
          name: "Update role",
          value: "updateRole"
        },
        {
          name: "Quit",
          value: "quit"
        }
      ]
    })
    .then(function(res) {
      menu(res.choices);
    });
}
