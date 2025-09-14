const express = require('express');
const peopleDB = require('../db/peopleDB');
const { route } = require('../app');

const router = express.Router();

router.get('/', async (_req, res) => {
    const [result] = await peopleDB.findAll();
    try{
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const [[result]] = await peopleDB.findByID(Number(id));
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'Person not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.sqlMessage });
    }
});

router.post('/', async (req, res) => {
    const person = req.body;
    try {
        const [result] = await peopleDB.insert(person);
        res.status(201).json({ message: `Person registered with id ${result.insertId}` });
    } catch (err) {
        res.status(500).json({ message: `Error when registering person`});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const person = req.body;
        const [result] = await peopleDB.update(Number(id), person);
        if (result.affectedRows > 0){
            res.status(200).json({ message: `Person with id ${id} updated` });
        } else {
            res.status(404).json({ message: `Person not found` });
        } 
    } catch (err) {
        res.status(500).json({ message: err.sqlMessage });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const{ id } = req.params;
        const [result] = await peopleDB.remove(Number(id));
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Person with id ${id} was deleted`});
        } else {
            res.status(404).json({ message: `Person not found` });
        }
    } catch (err) {
        res.status(500).json({ message: err.sqlMessage });
    }
})

module.exports = router;