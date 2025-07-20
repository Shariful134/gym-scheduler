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

//Canceled Booking
router.patch('/cancel/:id', auth('Trainee'), bookingControllers.cancelBooking);

//Get Booking
router.get('/get', bookingControllers.getAllBooking);

//Get Single Booking
router.get('/get/:id', bookingControllers.getSingleBooking);

//Delete Booking
router.delete('/delete/:id', auth('Trainee'), bookingControllers.deleteBooking);

export const bookingRotes = router;
