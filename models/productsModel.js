import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const tableName = 'Products';
const key = {
    accessKeyId : process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region : 'ap-northeast-2' };

AWS.config.update(key);
export const dynamoDB = new AWS.DynamoDB.DocumentClient();
