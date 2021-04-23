DROP DATABASE IF EXISTS juawitos_companyDB;

CREATE DATABASE juawitos_companyDB;

USE juawitos_companyDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lerantino', 'Johnson', 1, );