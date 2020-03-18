// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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

// View queries
function viewEmployees() {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
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

// Add queries
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role ID number?",
        name: "newEmpTitle"
      },
      {
        type: "input",
        message: "What is the employee's manager ID number?",
        name: "newEmpMgr"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.firstName,
          answer.lastName,
          answer.newEmpTitle,
          answer.newEmpMgr
        ],
        function(err, res) {
          if (err) throw err;
          viewEmployees();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this new department called?",
        name: "newDept"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answer.newDept],
        function(err, res) {
          if (err) throw err;
          viewDepartments();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is title of this new role?",
        name: "newTitle"
      },
      {
        type: "input",
        message: "What is salary for this new role?",
        name: "newSalary"
      },
      {
        type: "input",
        message: "What is the department ID number for this new role?",
        name: "newRoleDept"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.newTitle, answer.newSalary, answer.newRoleDept],
        function(err, res) {
          if (err) throw err;
          viewRoles();
        }
      );
    });
}

// Update role query
function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new role ID that you would like to assign?",
        name: "updateRole"
      },
      {
        type: "input",
        message:
          "What is the ID number of the employee that you would like to update?",
        name: "updateId"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [answer.updateRole, answer.updateId],
        function(err, res) {
          if (err) throw err;
          viewEmployees();
        }
      );
    });
}

// End
function quit() {
  console.log("See you next time");
  connection.end();
}
