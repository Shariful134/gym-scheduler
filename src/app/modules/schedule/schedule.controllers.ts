import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scheduleServices } from './schedule.services';

const classSchedule = catchAsync(async (req, res) => {
  const result = await scheduleServices.classScheduleIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class Scheduling Successfully',
    data: [result],
  });
});

export const scheduleControllers = {
  classSchedule,
};
