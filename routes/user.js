import { Router } from 'express';
import { signupUser } from '../controllers/user.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router({ mergeParams: true });

router.post('/signup', catchAsync(signupUser));
// router.post('/login', catchAsync());
// router.get('/logout', catchAsync());

export default router;
