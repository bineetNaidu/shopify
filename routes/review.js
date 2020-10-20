import { Router } from 'express';
import { createReview, deleteReview } from '../controllers/review.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router({ mergeParams: true });

router.post('/', catchAsync(createReview));
router.delete('/:rID', catchAsync(deleteReview));

export default router;
