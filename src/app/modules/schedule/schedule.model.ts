import mongoose, { Schema, model, Types } from 'mongoose';
import { IClassSchedule } from './shcedule.interface';

const classcheduleSchema = new Schema<IClassSchedule>(
  {
    title: { type: String, required: true },
    day: {
      type: String,
      enum: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      required: true,
      trim: true,
    },
    date: { type: Date, required: true },

    duration: { type: Number, default: 120 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxTrainees: { type: Number, default: 10 },
    bookedTrainees: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ClassSchedule = model<IClassSchedule>(
  'ClassSchedule',
  classcheduleSchema,
);
