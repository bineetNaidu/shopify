import express from 'express';
import logger from 'morgan';

const app = express();

app.use(express.json());
app.use(logger('dev'));

app.get('/api/v1', (_, res) => res.json({ greet: 'Hello Shopify' }));

app.listen(4242, () => console.log('Shopify Server has Started'));
