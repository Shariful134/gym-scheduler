import { Router } from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './authValidation';
import auth from '../../middlewares/auth';

const router = Router();

//Registration Admin
router.post(
  '/register-admin',
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerUser,
);

//Login User
router.post(
  '/login',
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser,
);

//Registration Trainer
router.post(
  '/register-trainer',
  auth('admin'),
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainer,
);

//Registration Trainee
router.post(
  '/register-trainee',
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainee,
);

export const authRoutes = router;
