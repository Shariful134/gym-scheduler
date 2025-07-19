import { Router } from 'express';

import { authRoutes } from '../modules/auth/auth.routes';
import { classScheduleRoutes } from '../modules/schedule/schedule.routes';
import { bookingRotes } from '../modules/booking/booking.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/schedule',
    route: classScheduleRoutes,
  },
  {
    path: '/booking',
    route: bookingRotes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
