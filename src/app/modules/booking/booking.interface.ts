import { Types } from 'mongoose';

export interface IBooking {
  _id?: Types.ObjectId;
  trainerId: Types.ObjectId;
  traineeId: Types.ObjectId;
  scheduleId: Types.ObjectId;
  status?: 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
