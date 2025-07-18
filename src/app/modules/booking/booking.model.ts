import mongoose, { Schema, model, Types } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    traineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSchedule',
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
