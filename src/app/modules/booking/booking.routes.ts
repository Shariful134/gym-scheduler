import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { bookingValidation } from './booking.validation';
import { bookingControllers } from './booking.controllers';

const router = Router();

//Create Booking
router.post(
  '/create',
  auth('Trainee'),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking,
);

//Update Booking
router.patch('/update/:id', auth('Trainee'), bookingControllers.updateBooking);

//Get Booking
router.get('/getAll', bookingControllers.getAllBooking);

//Get Single Booking
router.get('/getAll/:id', bookingControllers.getSingleBooking);

//Delete Booking
router.delete('/delete/:id', auth('Trainee'), bookingControllers.deleteBooking);

//Canceled Booking
router.patch('/cancel/:id', auth('Trainee'), bookingControllers.cancelBooking);

export const bookingRotes = router;
