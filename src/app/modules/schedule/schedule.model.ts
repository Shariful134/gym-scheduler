import mongoose, { Schema, model, Types } from 'mongoose';
import { IClassSchedule } from './shcedule.interface';

const classcheduleSchema = new Schema<IClassSchedule>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, default: 120 },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxTrainees: { type: Number, default: 10 },
    bookedTrainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export const ClassSchedule = model<IClassSchedule>(
  'Schedule',
  classcheduleSchema,
);
