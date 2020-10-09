DROP DATABASE IF EXISTS employeeManagementSystemDB;
CREATE DATABASE employeeManagementSystemDB;

USE employeeManagementSystemDB;

CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT,
-- will hold deparment name
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INTEGER NOT NULL AUTO_INCREMENT,
-- will hold title role
title VARCHAR(30),
salary DECIMAL(10,2) NOT NULL,
-- should reference department table
department_id INT,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
-- should refer to the role the employee has
role_id INT NOT NULL,
-- should reference another employee that manages the current employee
manager_id INT,
PRIMARY KEY(id)
);