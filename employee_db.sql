DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB
CHARACTER
SET utf8;

USE employee_DB;

CREATE TABLE departments
(
  id INT NOT NULL
  AUTO_INCREMENT,
department_name VARCHAR
  (50),
PRIMARY KEY
  (id)
);
  INSERT INTO departments
    (department_name)
  VALUES
    ("Engineering"),
    ("Sales"),
    ("Legal"),
    ("Accounting");

  CREATE TABLE roles
  (
    id INT NOT NULL
    AUTO_INCREMENT,
role_name VARCHAR
    (50),
salary INT,
department_id INT,
PRIMARY KEY
    (id),
FOREIGN KEY
    (department_id) REFERENCES departments
    (id) ON
    DELETE CASCADE
);

    INSERT INTO roles
      (role_name, salary, department_id)
    VALUES
      ("Senior Engineer", 50000, 1),
      ("Junior Engineer", 30000, 1),
      ("Sales Lead", 45000, 2),
      ("Salesperson", 35000, 2),
      ("Attourney", 50000, 3),
      ("Accountant", 60000, 4);

    CREATE TABLE employees
    (
      id INT NOT NULL
      AUTO_INCREMENT,
  first_name VARCHAR
      (50),
  last_name VARCHAR
      (50),
  role_id INT,
  manager_id INT,
  PRIMARY KEY
      (id),
  FOREIGN KEY
      (manager_id) REFERENCES employees
      (id),
  FOREIGN KEY
      (role_id) REFERENCES roles
      (id) ON
      DELETE CASCADE
);

      INSERT INTO employees
        (first_name, last_name, role_id)
      VALUES
        ("Lauren", "Noeltner", 1),
        (),
        ("Clint", "Brodar", 4),
        ("Johnny", "Appleseed", 3);

      -- displays formatted table with only relevant info
      SELECT e.first_name, e.last_name, r.role_name, r.salary, e.manager_id, m.first_name AS manager_firstname, m.last_name AS manager_lastname, r.department_id
      FROM employee_db.employees e
        INNER JOIN employee_db.employees m ON e.manager_id = m.id
        INNER JOIN employee_db.roles r ON e.role_id = r.id
        INNER JOIN employee_db.departments d ON r.department_id = d.id




