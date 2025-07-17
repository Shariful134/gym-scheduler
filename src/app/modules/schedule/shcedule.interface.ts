import { Types } from 'mongoose';

export interface IClassSchedule {
  _id?: Types.ObjectId;
  title: string;
  date: Date;
  duration?: number;
  trainerId: Types.ObjectId;
  maxTrainees?: number;
  bookedTrainees?: Types.ObjectId[];
}
