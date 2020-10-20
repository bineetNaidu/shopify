import express from 'express';
import logger from 'morgan';
import connectDB from './config/db.js';

const app = express();
connectDB();

app.use(express.json());
app.use(logger('dev'));

app.get('/api/v1', (_, res) => res.json({ greet: 'Hello Shopify' }));

app.listen(4242, () => console.log('Shopify Server has Started'));
