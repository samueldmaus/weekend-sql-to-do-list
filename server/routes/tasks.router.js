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
    })
})

module.exports = taskRouter;