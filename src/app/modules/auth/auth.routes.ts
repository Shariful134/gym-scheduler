import { Router } from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './authValidation';
import auth from '../../middlewares/auth';

const router = Router();

//Admin Registration Route
router.post(
  '/register-admin',
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerUser,
);

//Login User Route
router.post(
  '/login',
  validateRequest(authValidation.loginValidationschema),
  authControllers.loginUser,
);

//Trainer Registration Route
router.post(
  '/register-trainer',
  auth('Admin'),
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainer,
);

// Trainer Delete Route
router.delete(
  '/delete-trainer/:email',
  auth('Admin'),
  authControllers.deleteTrainer,
);

//Trainee Get by Email
router.get(
  '/get-trainer/:email',
  auth('Admin'),
  authControllers.getSingleTrainer,
);

//Get All User
router.get('/get-user', authControllers.getAllUser);

//Get All Trainer
router.get('/get-trainer', authControllers.getAllTrainer);

//Registration Trainee
router.post(
  '/register-trainee',
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainee,
);

export const authRoutes = router;
