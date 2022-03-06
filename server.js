import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async(req, res)=> {
    res.json('api running');
})
app.use('/products', productsRoutes);


const PORT = process.env.PORT || 8001;

app.listen(PORT, console.log('started server', PORT));