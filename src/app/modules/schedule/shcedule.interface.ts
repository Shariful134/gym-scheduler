import { Types } from 'mongoose';

export interface IClassSchedule {
  _id?: Types.ObjectId;
  title: string;
  day:
    | 'Saturday'
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday';
  date: Date;
  duration?: number;
  startTime: string;
  endTime: string;
  trainerId: Types.ObjectId;
  maxTrainees: number;
  bookedTrainees: Types.ObjectId[];
  createdBy: Types.ObjectId;
}
