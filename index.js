const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const fs = require("fs");

inquirer
  .prompt({ type: "input", message: "Figg'rit'oot", name: "response" })
  .then(function (response) {
    console.log(response);
  });
