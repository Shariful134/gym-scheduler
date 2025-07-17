import { ClassSchedule } from './schedule.model';
import { IClassSchedule } from './shcedule.interface';

// CreateShedule
const classScheduleIntoDB = async (payload: IClassSchedule) => {
  //   const user = await ClassSchedule.create(payload);

  //   //checking user is exists
  //   if (user) {
  //     throw new AppError(StatusCodes.BAD_REQUEST, 'Email Already Registered!');
  //   }
  const result = await ClassSchedule.create(payload);

  return result;
};

export const scheduleServices = {
  classScheduleIntoDB,
};
