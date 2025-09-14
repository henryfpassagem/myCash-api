const connection = require('./connection');

const findAll = () => connection.execute(
    'SELECT * FROM people'
);

const findByID = (id) => connection.execute(
    'SELECT * FROM people WHERE id = ?',
    [id],
);

const insert = (person) => connection.execute(
    `INSERT INTO people
    (first_name, last_name, email, phone) VALUES (?,?,?,?)`,
    [person.firstName, person.lastName, person.email, person.phone],
);

module.exports = {
    findAll,
    findByID,
    insert,
};