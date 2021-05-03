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
    CONSTRAINT fk_empRole
    FOREIGN KEY(role_id) REFERENCES emp_role(id)
);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Lerantino', 'Johnson', 1 );