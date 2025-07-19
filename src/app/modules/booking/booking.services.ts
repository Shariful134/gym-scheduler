import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Booking } from './booking.model';
import { IBooking } from './booking.interface';
import { ClassSchedule } from '../schedule/schedule.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { CustomJwtPayload } from '../../interface';
import { Types } from 'mongoose';

// Create Bookings
const createBookingIntoDB = async (
  payload: IBooking,
  trainee: CustomJwtPayload,
) => {
  const schedule = await ClassSchedule.findById(payload?.scheduleId);
  const matchTrainee = trainee?.id.toString();
  const matchTraineer = schedule?.trainerId.toString();

  if (matchTrainee !== payload?.traineeId.toString()) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trainee ID is not Match');
  }
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class Schedule not found!');
  }

  if (matchTraineer !== payload?.trainerId.toString()) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trainer ID is not Match!');
  }

  if (schedule?.bookedTrainees?.includes(payload?.traineeId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Trainee already booked!');
  }

  if (schedule?.bookedTrainees?.length >= 10) {
    //schedule?.maxTrainees
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Class schedule is full. Maximum 10 trainees allowed per schedule.',
    );
  }

  schedule.bookedTrainees.push(payload.traineeId);
  //   schedule.maxTrainees = (schedule.maxTrainees || 0) + 1;

  await schedule.save();

  const result = await Booking.create(payload);

  return result;
};

// Update Bookings
const updateBookingIntoDB = async (
  id: string,
  userData: CustomJwtPayload,
  payload: Record<string, any>,
) => {
  const booking = await Booking.findById(id);
  const schedule = await ClassSchedule.findById(booking?.scheduleId);
  const traineeID = booking?.traineeId.toString();
  console.log(traineeID, userData?.id);
  if (!booking || booking?.status === 'cancelled') {
    throw new AppError(StatusCodes.CREATED, 'Booking is not Found!');
  }
  if (traineeID !== userData?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trainee ID is not Match');
  }
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Schedule is not Found!');
  }
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.CREATED, 'Updated Failed!');
  }

  return result;
};

// get Bookings
const getAllBookingIntoDB = async () => {
  const result = await Booking.find();
  if (!result) {
    throw new AppError(StatusCodes.CREATED, 'Booking is not Found!');
  }
  return result;
};

// get single Bookings
const getSingleBookingIntoDB = async (id: string) => {
  const result = await Booking.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.CREATED, 'Booking is not Found!');
  }
  return result;
};

// DeleteBookings
const deleteBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.CREATED, 'Booking is not Found!');
  }
  return result;
};

// Cancel Bookings
const cancelBookingIntoDB = async (id: string, payload: CustomJwtPayload) => {
  const matchTrainee = payload?.id.toString();
  const booking = await Booking.findById(id);
  const schedule = await ClassSchedule.findById(booking?.scheduleId);
  const traineeID = booking?.traineeId.toString();
  if (!booking) {
    throw new AppError(StatusCodes.CREATED, 'Booking is not Found!');
  }
  if (traineeID !== matchTrainee) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trainee ID is not Match');
  }
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    { status: 'cancelled' },
    { new: true },
  );
  if (result && schedule) {
    schedule.bookedTrainees = schedule?.bookedTrainees?.filter(
      (bookedTraine) =>
        bookedTraine.toString() !== booking?.traineeId.toString(),
    );

    await schedule?.save();
  }

  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  getAllBookingIntoDB,
  getSingleBookingIntoDB,
  deleteBookingIntoDB,
  cancelBookingIntoDB,
};
