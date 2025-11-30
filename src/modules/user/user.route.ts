import { Router } from 'express';
import { asyncHandler } from '../../shared/middleware/responseHandler';
import {
  signIn,
  signUp,
  signOut,
  filterUser,
  getGoogleLogin,
  googleCallback,
  refreshAccessToken,
} from './user.controller';

const router = Router();

router.post('/sign-up', asyncHandler(signUp));
router.post('/sign-in', asyncHandler(signIn));
router.post('/sign-out', asyncHandler(signOut));
router.get('/filter-user', asyncHandler(filterUser));

//token-expire-end-point
router.post('/refresh-access-token', refreshAccessToken);

// google
router.get('/google', getGoogleLogin);
router.get('/google/callback', googleCallback);

export default router;
