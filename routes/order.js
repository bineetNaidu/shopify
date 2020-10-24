import { Router } from 'express';
import {
  createUserOrder,
  getOrders,
  getUsersOrders,
} from '../controllers/order.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router({ mergeParams: true });

router.get('/', catchAsync(getOrders));
router
  .route('/:uid')
  .get(catchAsync(getUsersOrders))
  .post(catchAsync(createUserOrder));

export default router;
