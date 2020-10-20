import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router.route('/').get(catchAsync(getProducts)).post(catchAsync(createProduct));

export default router;
