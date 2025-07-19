import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.services';

//Crete Booking
const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Successfully',
    data: [result],
  });
});

//Get All Booking
const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Retrived Successfully',
    data: result,
  });
});

//Get Single Booking
const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Retrived Successfully',
    data: result,
  });
});

//delete Booking
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.deleteBookingIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Deleted Successfully',
    data: result,
  });
});

//Cancel Booking
const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.cancelBookingIntoDB(id, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Canlceled Successfully',
    data: result,
  });
});

//Update Booking
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  console.log('controler:', user);

  const result = await bookingServices.updateBookingIntoDB(id, user, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking Updated Successfully',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  updateBooking,
  getAllBooking,
  getSingleBooking,
  deleteBooking,
  cancelBooking,
};
