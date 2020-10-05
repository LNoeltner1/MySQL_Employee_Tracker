const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const fs = require("fs");

const initQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "mainAction",
    choices: [
      "Add Employee",
      "Add Role",
      "Add Department",
      "View Employees",
      "View Roles",
      "View Departments",
      "Update Employee Role",
    ],
  },
];

inquirer
  .prompt(initQuestion)
  .then(function (response) {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
