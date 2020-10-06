DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB
CHARACTER
SET utf8;
USE employee_DB;


CREATE TABLE employees
(
  id INT(11) NOT NULL
  AUTO_INCREMENT,
  name VARCHAR
  (50),
  city VARCHAR
  (50),
  PRIMARY KEY
  (id),
);

  CREATE TABLE departments
  (
    id INT(11) NOT NULL
    AUTO_INCREMENT,
name VARCHAR
    (50),
city VARCHAR
    (50),
PRIMARY KEY
    (id),
);

    CREATE TABLE roles
    (
      id INT(11) NOT NULL
      AUTO_INCREMENT,
name VARCHAR
      (50),
city VARCHAR
      (50),
PRIMARY KEY
      (id),
);