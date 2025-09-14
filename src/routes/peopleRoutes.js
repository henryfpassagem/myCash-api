const express = require('express');
const peopleDB = require('../db/peopleDB');

const router = express.Router();

router.post('/', async (req, res) => {
    const person = req.body;
    try {
        const [result] = await peopleDB.insert(person);
        res.status(201).json({ message: `Person registered with id ${result.insertId}` });
    } catch (err) {
        res.status(500).json({ message: `Error when registering person`});
    }
});

module.exports = router;