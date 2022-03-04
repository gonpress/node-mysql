import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from "body-parser";
import dbConfig from './config/db.js';
import productRoutes from './routes/productsRoutes.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 8001;

app.get('/', (req, res)=> {
    res.json('api running');
})

app.use('/products', productRoutes);


app.listen(PORT, console.log('started server', PORT));