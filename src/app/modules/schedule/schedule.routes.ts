import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { scheduleControllers } from './schedule.controllers';
import { scheduleValidation } from './schedule.validation';
import auth from '../../middlewares/auth';

const router = Router();

//Create Class Scheduler
router.post(
  '/create',
  auth('Admin'),
  validateRequest(scheduleValidation.scheduleValidationSchema),
  scheduleControllers.classSchedule,
);

//update Class Scheduler
router.patch(
  '/update/:id',
  auth('Admin'),
  validateRequest(scheduleValidation.scheduleValidationSchemaUpdate),
  scheduleControllers.updateClassSchedule,
);

//delete Class Scheduler
router.delete(
  '/delete/:id',
  auth('Admin'),
  scheduleControllers.deleteClassSchedule,
);

//getSingle Class Scheduler
router.get('/get/:id', scheduleControllers.getSingleClassSchedule);

//getAll Class Scheduler
router.get('/get', scheduleControllers.getAllClassSchedule);

//getAll Class Scheduler with assined Trainee
router.get(
  '/get-assignedTrainer',
  auth('Trainer'),
  scheduleControllers.getAssignedSchedules,
);

export const classScheduleRoutes = router;
