const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('in GET');
    let queryText = `
    SELECT * FROM "tasks"
    ORDER BY time_created;
    `;

    pool.query(queryText)
    .then(response => {
        res.send(response.rows);
    }).catch(error => {
        console.log('Error getting tasks', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log('in POST');
    let queryText = `
    INSERT INTO "tasks" ("task", "time_created")
    VALUES ($1, current_timestamp);
    `

    let value = [req.body.task]

    pool.query(queryText, value)
    .then(response => {
        res.sendStatus(201);
        console.log('POST created!');
        
    }).catch(error => {
        res.sendStatus(500);
    })
    
})

router.delete('/:id', (req, res) => {
    console.log('Delete task:', req.params.id);
    let id = req.params.id;

    let queryText = `
    DELETE FROM "tasks"
    WHERE "id" = $1
    `

    let values = [id]

    pool.query(queryText, values)
    .then(reponse => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(500)
    })
    
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    let queryText = `
    UPDATE "tasks"
    SET "is_it_complete" = true
    WHERE "id" = $1
    `

    let value = [id];

    pool.query(queryText, value)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router