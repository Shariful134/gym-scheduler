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
  auth('Admin'),
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainer,
);

//delete Trainer
router.delete(
  '/delete-trainer/:email',
  auth('Admin'),
  authControllers.deleteTrainer,
);

//Get SingleTrainer
router.get(
  '/getSingle-trainer/:email',
  auth('Admin'),
  authControllers.getSingleTrainer,
);

//Get All User
router.get('/getAll-user', authControllers.getAllUser);

//Get All Trainer
router.get('/getAll-trainer', authControllers.getAllTrainer);

//Registration Trainee
router.post(
  '/register-trainee',
  validateRequest(authValidation.registerUserValidationSchema),
  authControllers.registerdTrainee,
);

export const authRoutes = router;
