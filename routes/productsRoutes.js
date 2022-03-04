import express from 'express';
import mysql from 'mysql';
import dbConfig from "../config/db.js";


const router = express.Router();
const connection = mysql.createConnection(dbConfig);

router.get('/', async(req, res) => {
    const products = connection.query('select * from products', (error, rows, fields) => {
        if(error) throw error;

        console.log(rows);
        res.json(rows);
    })
})

router.post('/', async(req,res) => {
    const {name, description, brand, price} = req.body;

    connection.query(`INSERT INTO products (name,description,brand,price) VALUES ('${name}', '${description}', '${brand}', ${price});`, (error, rows, fields) => {
        if(error) throw error;

        console.log(rows);
        res.json(rows);
    })
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;

    // connection.query('select * from products where id=?',[id], (err, rows, fields) => {
    connection.query(`select * from products where id=${connection.escape(id)}`, (err, rows, fields) => {
        if(err) throw err;

        console.log(rows);
        res.json(rows);
    })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    connection.query(`delete from products where id=${connection.escape(id)}`, (err, rows, fields) => {
        if(err) {
            console.error(err);
            throw err;
        }

        console.log(rows);
        res.json(rows);
    })
})

export default router;