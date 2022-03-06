import express from 'express';
import {dynamoDB} from '../models/productsModel.js';
import {v4} from 'uuid';

const tableName = 'Products';
const router = express.Router();


// 전체 get
router.get('/', async(req, res) => {
    const params = {
        TableName: tableName,
    };

    dynamoDB.scan(params, function(err, data) {
        if(err) {
            res.status(500).json({
                    success:'false',
                    message:'Error : Server error',
                }
            )
        } else{
            res.json({
                success:'true',
                message:'success',
                data:data,
            });
        }
    });
})

// 특정 id get
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    const params = {
        TableName: tableName,
        Key:{
            "id": id
        }
    };

    await dynamoDB.get(params, function(err, data) {
        if(err) {
            res.status(500).json({
                    success:'false',
                    message:'Error : Server error',
                }
            )
        } else{
            res.json({
                success:'true',
                message:'success',
                data:data,
            });
        }
    });
})

// 신규 생성
router.post('/', async(req, res) => {
    const {name, brand, price, desc} = req.body;
    const id = v4();

    const put = {
        TableName : tableName,
        Item : {
            id,
            name,
            brand,
            price,
            desc,
        }
    }
    await dynamoDB.put(put, (err, data) => {
        if(err) {
            res.status(500).json({
                    success:'false',
                    message:'Error : Server error',
                }
            )
        } else{
            res.json({
                success:'true',
                message:'success',
                data:data,
            });
        }
    });
})

// 특정 id 수정
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const {name, brand, price} = req.body;

    const params = {
        TableName: tableName,
        Key:{
            "id": id,
        },
        UpdateExpression: "set #na=:name, brand=:brand, price=:price",
        // ConditionExpression: "size(condition) > :num",
        ExpressionAttributeValues:{
            ":name":name,
            ":brand":brand,
            ":price":price,
            // ":num": 3,
        },
        ExpressionAttributeNames:{
            "#na": "name",
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log(params);

    await dynamoDB.update(params, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                    success:'false',
                    message:'Error : Server error',
                }
            )
        } else{
            res.json({
                success:'true',
                message:'success',
                data:data,
            });
        }
    });
})

// 특정 id 삭제
router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    const params = {
        TableName:tableName,
        Key:{
            "id": id,
        }
    }

    dynamoDB.delete(params, (err, data) => {
        if(err) {
            res.status(500).json({
                    success:'false',
                    message:'Error : Server error',
                }
            )
        } else{
            res.json({
                success:'true',
                message:'success',
                data:data,
            });
        }
    });
})



export default router;
