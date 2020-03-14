// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Database connection
const connection = mysql.createConnection({
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
      message: "What would you like to do?",
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

function menu(option) {
  switch (option) {
    case "viewEmployees":
      viewEmployees();
      break;
    case "viewDepartments":
      viewDepartments();
      break;
    case "viewRoles":
      viewRoles();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "addDepartment":
      addDepartment();
      break;
    case "addRole":
      addRole();
      break;
    case "updateRole":
      updateRole();
      break;
    case "quit":
      quit();
      break;
  }
}

function viewEmployees() {
  connection.query(
    "SELECT id, first_name, last_name, role_id, manager_id FROM employees",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    }
  );
}

function viewDepartments() {
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

function quit() {
  console.log("See you next time");
  connection.end();
}
