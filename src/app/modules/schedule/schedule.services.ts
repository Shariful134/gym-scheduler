import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ClassSchedule } from './schedule.model';
import { IClassSchedule } from './shcedule.interface';
import { User } from '../auth/auth.model';
import convertToMinutes from '../../utils/converToMinutes';

// CreateShedule
const classScheduleIntoDB = async (payload: IClassSchedule) => {
  const trainer = await User.findById(payload?.trainerId);
  const admin = await User.findById(payload?.createdBy);
  const startMinutes = convertToMinutes(payload.startTime);
  const endMinutes = convertToMinutes(payload.endTime);
  const classDuration = endMinutes - startMinutes;

  if (!admin) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Admin or createdBy is not Found!',
    );
  }

  if (trainer?.role !== 'Trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This is not Trainer Id');
  }

  const traineeChecks = await Promise.all(
    payload.bookedTrainees.map(async (traineeId) => {
      const user = await User.findById(traineeId);
      if (!user || user.role !== 'Trainee') {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `User with ID ${traineeId} is not a Trainee`,
        );
      }
    }),
  );

  if (classDuration !== 120) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Each class must be exactly 2 hours long (120 minutes)',
    );
  }

  const existingSchedules = await ClassSchedule.find({
    trainerId: payload.trainerId,
    date: payload.date,
  });
  const available = existingSchedules?.map((schedule) => schedule.endTime);

  for (const schedule of existingSchedules) {
    const existingStart = convertToMinutes(schedule.startTime);
    const existingEnd = convertToMinutes(schedule.endTime);

    const isOverlapping =
      startMinutes < existingEnd && endMinutes > existingStart;
    if (isOverlapping) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `This Trainer already has a class at this time. Available: after ${available[available?.length - 1]}.`,
      );
    }
  }

  if (
    Number(payload?.maxTrainees) > 10 &&
    payload?.bookedTrainees.length > 10
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Each class can have a maximum of 10 trainees',
    );
  }

  const sameDayCount = await ClassSchedule.countDocuments({
    date: payload?.date,
  });
  if (sameDayCount >= 5) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Cannot schedule more than 5 classes per day',
    );
  }

  const payloads = {
    ...payload,
    duration: classDuration,
  };
  const result = await ClassSchedule.create(payloads);

  return result;
};

// Update ClassShedule
const updateClassScheduleIntoDB = async (
  id: string,
  payload: Record<string, any>,
) => {
  const schedule = await ClassSchedule.findById(id);

  if (!schedule) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Schedule is not Found!');
  }

  const trainer = await User.findById(payload?.trainerId);
  if (trainer?.role !== 'Trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'This is not Trainer Id');
  }

  const traineeChecks = await Promise.all(
    payload.bookedTrainees.map(async (traineeId: string) => {
      const user = await User.findById(traineeId);
      if (!user || user.role !== 'Trainee') {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `User with ID ${traineeId} is not a Trainee`,
        );
      }
    }),
  );

  if (payload?.duration > 120) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Each class must be exactly 2 hours long (120 minutes)',
    );
  }

  if (
    Number(payload?.maxTrainees) > 10 &&
    payload?.bookedTrainees.length > 10
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Each class can have a maximum of 10 trainees',
    );
  }

  const sameDayCount = await ClassSchedule.countDocuments({
    date: payload?.date,
  });
  if (sameDayCount >= 5) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Cannot schedule more than 5 classes per day',
    );
  }

  const result = await ClassSchedule.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// Delete ClassShedule
const deleteClassScheduleIntoDB = async (id: string) => {
  const result = await ClassSchedule.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Class Schedule is not Found!');
  }
  return result;
};

// Get Single ClassSchedule
const getSingleClassScheduleIntoDB = async (id: string) => {
  const result = await ClassSchedule.findById(id).populate('trainerId');
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Class Schedule is not Found!');
  }
  return result;
};

//getAll ClassSchedule
const getAllClassScheduleIntoDB = async () => {
  const result = await ClassSchedule.find().populate('trainerId');
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Class Schedule is not Found!');
  }
  return result;
};

//getAll ClassSchedule with assigned Trainee
const getAssignedSchedulesIntoDB = async (id: string) => {
  const result = await ClassSchedule.find({ trainerId: id }).populate(
    'trainerId',
  );
  if (result?.length === 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Your Class Schedule is not Found!',
    );
  }
  return result;
};

export const scheduleServices = {
  classScheduleIntoDB,
  updateClassScheduleIntoDB,
  deleteClassScheduleIntoDB,
  getSingleClassScheduleIntoDB,
  getAllClassScheduleIntoDB,
  getAssignedSchedulesIntoDB,
};
