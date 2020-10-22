import express from 'express';
import logger from 'morgan';
import connectDB from './config/db.js';
import CreateError from 'http-errors';

import productsRoutes from './routes/product.js';
import reviewsRoutes from './routes/review.js';

const app = express();
connectDB();

app.use(express.json());
app.use(logger('dev'));

app.use('/api/p', productsRoutes);
app.use('/api/p/:pID', reviewsRoutes);

//! catch 404 and forward to error handler
app.all('*', (req, res, next) => next(new CreateError(404)));

//! error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.json({ error: err.message, status: statusCode });
});
app.listen(4242, () => console.log('Shopify Server has Started'));
