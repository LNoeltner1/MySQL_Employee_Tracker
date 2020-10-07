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
  database: "employee_db",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

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

  inquirer.prompt(initQuestion).then(function (response) {
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
    // .catch((err) => {
    //   console.log(err);
    // });
  });
}
//function definitions
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
      var query2 = "INSERT INTO employees SET ?";
      connection.query(
        query2,
        {
          first_name: response.firstname,
          last_name: response.lastname,
          role_id: response.inputEmployeeRoleID,
          manager_id: response.inputEmployeeManagerID,
        },
        function (err, data) {
          if (err) throw err;
          console.log(data);
        }
      );
      var query3 =
        "SELECT e.first_name, e.last_name, r.role_name, r.salary, e.manager_id, m.first_name AS manager_firstname, m.last_name AS manager_lastname, r.department_id ";
      query3 += "FROM employee_db.employees e ";
      query3 += "INNER JOIN employee_db.employees m ON e.manager_id = m.id ";
      query3 += "INNER JOIN employee_db.roles r ON e.role_id = r.id ";
      query3 +=
        "INNER JOIN employee_db.departments d ON r.department_id = d.id";
      connection.query(query3, function (err, data) {
        if (err) throw err;
        console.table(data);
        // startApp();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// function addRole() {
//   const roleAssignmentPrompt = [
//     {
//       type: "number",
//       message: "What role would you like to create?",
//       name: "addrole",
//     },
//   ];
//   inquirer.prompt(roleAssignmentPrompt).then(function (response) {
//     var query8 = "INSERT INTO roles SET ?";
//     connection.query(query8, { role_name: response.name }, function (
//       err,
//       data
//     ) {
//       if (err) throw err;
//     });
//     var query9 = "SELECT * FROM roles";
//     connection
//       .query(query9, function (err, data) {
//         if (err) throw err;
//         console.table(data);
//         // startApp();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// }

// function addDepartment() {
//   const addDeptOptions = [
//     {
//       type: "input",
//       message: "What department would you like to add?",
//       name: "adddepartment",
//     },
//   ];
//   inquirer.prompt(addDeptOptions).then(function (response) {
//     var query10 = "INSERT INTO departments SET ?";
//     connection.query(
//       query10,
//       {
//         department_name: response.name,
//       },
//       function (err, data) {
//         if (err) throw err;
//         console.table(data);
//       }
//     );
//   });
// }

// function viewEmployees() {
//   var query7 =
//     "SELECT e.first_name, e.last_name, r.role_name, r.salary, e.manager_id, m.first_name AS manager_firstname, m.last_name AS manager_lastname, r.department_id ";
//   query7 += "FROM employee_db.employees e ";
//   query7 += "INNER JOIN employee_db.employees m ON e.manager_id = m.id ";
//   query7 += "INNER JOIN employee_db.roles r ON e.role_id = r.id ";
//   query7 += "INNER JOIN employee_db.departments d ON r.department_id = d.id";
//   connection.query(query7, function (err, data) {
//     if (err) throw err;
//     console.table(data);
//   });

//   inquirer
//     .prompt({ name: "back", message: "", choices: "BACK" })
//     .then(function (response) {
//       // startApp();
//     });
// }

//   function viewRoles() {
//     var query5 = "SELECT * FROM roles";
//     connection.query(query5, function (err, data) {
//       if (err) throw err;
//       console.table(data);
//     });

//     inquirer
//       .prompt({ name: "back", message: "", choices: "BACK" })
//       .then(function (response) {
//         // startApp();
//       });
//   }

//   function viewDepartments() {
//     var query6 = "SELECT * FROM departments";
//     connection.query(query6, function (err, data) {
//       if (err) throw err;
//       console.table(data);
//     });

//     inquirer
//       .prompt({ name: "back", message: "", choices: "BACK" })
//       .then(function (response) {
//         // startApp();
//       });
//   }

//   function updateRole() {
//     const roleAssignmentPrompt = [
//       {
//         type: "number",
//         message: "What role would you like to assign this employee?",
//         name: "roleAssignment",
//       },
//     ];
//     inquirer.prompt(roleAssignmentPrompt).then(function (response) {
//       console.log(response);
//       startApp();
//     });
//   }
//   function removeEmployee() {
//     const removeOptions = [{}];
//     inquirer.prompt(removeOptions).then(function (response) {
//       console.log(response);
//       // startApp();
//     });
//   }
// }

//example mysql query
// connection.query(
//   "SELECT position, artist, song FROM songs where year BETWEEN ? AND ?;",
//   [firstNumber, secondNumber],
//   (err, data) => {
//     if (err) throw err;
//     console.table(data);
//     connection.end();
//   }
// );
