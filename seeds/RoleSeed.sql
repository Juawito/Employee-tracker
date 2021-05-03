USE juawitos_companyDB;

CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_departmentId
    FOREIGN KEY(department_id)  REFERENCES department(id),
    PRIMARY KEY(id)
);

INSERT INTO emp_role (title, salary, department_id)
VALUES ('Lead HR', 55000, 1);