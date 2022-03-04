import express from 'express';
import mysql from 'mysql2';
import dbConfig from "../config/db.js";


const router = express.Router();
// const db = mysql.createConnection(dbConfig);
const db = mysql.createPool(dbConfig);

router.get('/', async(req, res) => {
    const products = db.query('select * from products', (error, rows, fields) => {
        if(error) throw error;

        console.log(rows);
        res.json(rows);
    })
})

router.post('/', async(req,res) => {
    const {name, description, brand, price} = req.body;

    db.query(`INSERT INTO products (name,description,brand,price) VALUES ('${name}', '${description}', '${brand}', ${price});`, (error, rows, fields) => {
        if(error) throw error;

        console.log(rows);
        res.json(rows);
    })
})

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    db.getConnection(function(err, conn) {  // 연결
        if ( err ) throw err;
        else {
            conn.query(`select * from products where id=${db.escape(id)}`, function(err, results) {
                if (err) throw err;
                else
                {
                    console.log(results);
                    res.json(results);
                }
            })
            conn.release() // 연결 해제
        }
    });

    // db.query('select * from products where id=?',[id], (err, rows, fields) => {
    // db.query(`select * from products where id=${db.escape(id)}`, (err, rows, fields) => {
    //     if(err) throw err;
    //
    //     console.log(rows);
    //     res.json(rows);
    // })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    db.query(`delete from products where id=${db.escape(id)}`, (err, rows, fields) => {
        if(err) {
            console.error(err);
            throw err;
        }

        console.log(rows);
        res.json(rows);
    })
})

export default router;