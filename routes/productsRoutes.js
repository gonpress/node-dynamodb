import express from 'express';
import {dynamoDB} from '../models/productsModel.js';

const tableName = 'Products';
const router = express.Router();

router.get('/', async(req, res) => {

    res.json('a');
})

router.post('/', async(req, res) => {
    const put = {
        TableName : tableName,
        Item : {
            id : 3,
            name : 'data1',
            price : 'data2'
        }
    }

    dynamoDB.put(put, (err, data) => {
        console.log(err, data);
    });
    // console.log(productModel);
})
export default router;
