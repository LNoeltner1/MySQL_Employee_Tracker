const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const fs = require("fs");
const { allowedNodeEnvironmentFlags } = require("process");
const { start } = require("repl");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "LaurensPassword",
  database: //fill in,
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  connection.query ("SELECT * FROM databaseNamme", function (err, data) {
    if (err) throw err;
    console.table(data)
  })
});
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername", //TODO: fill in
//   password: "LaurensPassword",
//   database: "mydb", //TODO: fill in
// });

//App Initiation and main set of options
startApp();
function startApp() {
  const initQuestion = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "mainQuestion",
      choices: [
        "Add Employee",
        "Add Role",
        "Add Department",
        "View Employees",
        "View Roles",
        "View Departments",
        "Update Employee Role",
        "Remove Employee",
      ],
    },
  ];

  inquirer
    .prompt(initQuestion)
    .then(function (response) {
      //   console.log(response);
      if (response.mainQuestion == "Add Employee") {
        addEmployee();
      } else if (response.mainQuestion == "Add Role") {
        addRole();
      } else if (response.mainQuestion == "Add Department") {
        addDepartment();
      } else if (response.mainQuestion == "View Employees") {
        viewEmployees();
      } else if (response.mainQuestion == "View Roles") {
        viewRoles();
      } else if (response.mainQuestion == "View Departments") {
        viewDepartments();
      } else if (response.mainQuestion == "Update Employee Role") {
        updateRole();
      } else if (response.mainQuestion == "Remove Employee") {
        removeEmployee();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//function definitions
let employees = [];
let departments = [];
let roles = [];

function addEmployee() {
  const addEmployeeOptions = [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstname",
    },
    {
      type: "input",
      message: "what is the employee's last name?",
      name: "lastname",
    },
    {
      type: "number",
      message: "What is the empoyee's role ID number?", //OR: give hardcode selection of the company roles
      name: "inputEmployeeRoleID",
    },
    {
      type: "number",
      message: "What is the employee's manager ID number?", //OR: ask 'Who does this employee answer to?'
      name: "inputEmployeeManagerID",
    },
  ];
  inquirer
    .prompt(addEmployeeOptions)
    .then(function (response) {
      console.log(
        response.firstname,
        response.lastname,
        response.inputEmployeeRoleID,
        response.inputEmployeeManagerID
      );
      employees.push(response.firstname + " " + response.lastname);
      roles.push(response.inputEmployeeRoleID);
      console.log(response.firstname + response.lastname, roles);
      startApp();
    })
    .catch((err) => {
      console.log(err);
    });
}

function addRole() {
  console.log(employees);
  const selectEmployee = [
    { type: "list", name: "employeelist", choices: employees },
  ];
  const roleAssignmentPrompt = [
    {
      type: "number",
      message: "What role would you like to assign this employee?",
      name: "roleAssignment",
    },
  ];
  inquirer.prompt(selectEmployee).then(function (response) {
    console.log(response);

    inquirer.prompt(roleAssignmentPrompt).then(function (response) {
      roles.push(response);
      console.log(roles);
      startApp();
    });
  });
}

function addDepartment() {
  const addDeptOptions = [{}];
  inquirer.prompt(addDeptOptions).then(function (response) {
    console.log(response);
  });
}
function viewEmployees() {
  const viewEmployeeOptions = [{}];
  inquirer.prompt(viewEmployeeOptions).then(function (response) {
    console.log(response);
  });
}
function viewRoles() {
  const viewRoleOptions = [{}];
  inquirer.prompt(viewRoleOptions).then(function (response) {
    console.log(response);
  });
}
function viewDepartments() {
  const viewDeptOptions = [{}];
  inquirer.prompt(viewDeptOptions).then(function (response) {
    console.log(response);
  });
}
function updateRole() {
  const updateRoleOptions = [{}];
  inquirer.prompt(updateRoleOptions).then(function (response) {
    console.log(response);
    startApp();
  });
}
function removeEmployee() {
  const removeOptions = [{}];
  inquirer.prompt(removeOptions).then(function (response) {
    console.log(response);
    startApp();
  });
}
