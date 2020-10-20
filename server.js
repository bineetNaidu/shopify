import express from 'express';
import logger from 'morgan';
import connectDB from './config/db.js';

import productsRoutes from './routes/product.js';
import categoriesRoutes from './routes/category.js';

const app = express();
connectDB();

app.use(express.json());
app.use(logger('dev'));

app.use('/api/c', categoriesRoutes);
app.use('/api/p', productsRoutes);

app.listen(4242, () => console.log('Shopify Server has Started'));
