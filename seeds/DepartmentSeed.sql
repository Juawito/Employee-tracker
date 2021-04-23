USE juawitos_companyDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES ('Human Resources');