DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- Creating tables
CREATE TABLE departments
(
    id INT
    AUTO_INCREMENT NOT NULL,
    name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE roles
    (
        id INT
        AUTO_INCREMENT NOT NULL,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY
        (id)
);

        CREATE TABLE employees
        (
            id INT
            AUTO_INCREMENT NOT NULL,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY
            (id)
);

            -- Adding data to tables
            INSERT INTO departments
                (name)
            VALUES
                ("Sales"),
                ("Engineering"),
                ("Finance"),
                ("Operations");

            INSERT INTO roles
                (title, salary, department_id)
            VALUES
                ("Account Manager", 90000, 1),
                ("Inside Sales", 75000, 1),
                ("Marketing Assistant", 60000, 1),
                ("Engineering Manager", 105000, 2),
                ("Design Engineer", 85000, 2),
                ("Engineering Intern", 40000, 2),
                ("Finance Manager", 95000, 3),
                ("Cost Analyst", 60000, 3),
                ("Junior Accountant", 50000, 3),
                ("Operations Manager", 90000, 4),
                ("Shift Supervisor", 55000, 4),
                ("Machine Operator", 35000, 4);

            INSERT INTO employees
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Matt", "Kelly", 1, null),
                ("Ben", "Iwen", 2, 1),
                ("Cindy", "Thomas", 3, 1),
                ("Kim", "Bowles", 4, null),
                ("Pat", "Jennings", 5, 4),
                ("Keenan", "Thwaite", 6, 4),
                ("Charles", "Tate", 7, null),
                ("Kate", "Lyles", 8, 7),
                ("Laura", "Nguyen", 9, 7),
                ("Sarah", "Johnson", 10, null),
                ("Tracy", "Nelson", 11, 10),
                ("Bob", "Blake", 12, 10);