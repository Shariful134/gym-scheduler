import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { scheduleControllers } from './schedule.controllers';

const router = Router();

//Create Class Scheduler
router.post(
  '/create',
  // validateRequest(authValidation.registerUserValidationSchema),
  scheduleControllers.classSchedule,
);

export const classScheduleRoutes = router;
