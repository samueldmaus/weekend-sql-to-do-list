const express = require('express');
const {Router} = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool.js');

taskRouter.get('/', (req, res) => {
    let query = `SELECT * FROM "tasks" ORDER BY "id";`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET:', error);
        res.sendStatus(500);
    });
});

taskRouter.post('/', (req, res) => {
    let query = `INSERT INTO "tasks" ("task_name", "task_note", "task_priority")
    VALUES ($1, $2, $3);`;
    pool.query(query, [req.body.task_name, req.body.task_note, req.body.task_priority]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST:', error);
        res.sendStatus(500);
    });
});

module.exports = taskRouter;