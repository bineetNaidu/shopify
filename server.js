import express from 'express';
import logger from 'morgan';
import connectDB from './config/db.js';

import productsRoutes from './routes/product.js';
import reviewsRoutes from './routes/review.js';

const app = express();
connectDB();

app.use(express.json());
app.use(logger('dev'));

app.use('/api/p', productsRoutes);
app.use('/api/p/:pID', reviewsRoutes);

app.listen(4242, () => console.log('Shopify Server has Started'));
