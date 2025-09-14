/*DROP DATABASE IF EXISTS myCash_db;

CREATE DATABASE myCash_db;*/

USE myCash_db;

CREATE TABLE people (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(20),
    UNIQUE(email)
);

CREATE TABLE transactions(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    type INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    CONSTRAINT fk_transaction_person_id FOREIGN KEY(person_id)
    REFERENCES people(id)
);
/*
CONSTRAINT fk_transaction_person_id: gives a name to the constraint, useful for altering or dropping it later
FOREIGN KEY (person_id): indicates that person_id is a foreign key
REFERENCES people(id): ensures the value exists in people.id, maintaining referential integrity
*/

CREATE TABLE logs(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    event VARCHAR(100) NOT NULL,
    timestamp BIGINT NOT NULL,
    person_id INTEGER NOT NULL,
    CONSTRAINT fk_logs_person_id FOREIGN KEY(person_id)
    REFERENCES people(id)
);
