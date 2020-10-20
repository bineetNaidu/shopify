import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router
  .route('/')
  .get(catchAsync(getCategories))
  .post(catchAsync(createCategory));

export default router;
