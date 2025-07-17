import { Router } from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './authValidation';

const router = Router();

//Registration User
router.post(
  '/register',
  // validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerUser,
);

//Login User
router.post(
  '/login',
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser,
);

export const authRoutes = router;
