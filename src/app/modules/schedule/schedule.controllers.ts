import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { scheduleServices } from './schedule.services';
//Crete class Schedule
const classSchedule = catchAsync(async (req, res) => {
  const result = await scheduleServices.classScheduleIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class scheduled successfully',
    data: [result],
  });
});

//Update Class Schedule
const updateClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await scheduleServices.updateClassScheduleIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class scheduled updated successfully',
    data: [result],
  });
});

//Delete Class Schedule
const deleteClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await scheduleServices.deleteClassScheduleIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class scheduled Deleted successfully',
    data: [result],
  });
});

//GetSingle Class Schedule
const getSingleClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await scheduleServices.getSingleClassScheduleIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class scheduled Retrived successfully',
    data: result,
  });
});

//GetAll Class Schedule
const getAllClassSchedule = catchAsync(async (req, res) => {
  const result = await scheduleServices.getAllClassScheduleIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'All Class scheduled Retrived successfully',
    data: result,
  });
});

//GetAll Class Schedule
const getAssignedSchedules = catchAsync(async (req, res) => {
  const result = await scheduleServices.getAssignedSchedulesIntoDB(
    req?.user?.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'All Class scheduled Retrived successfully',
    data: result,
  });
});

export const scheduleControllers = {
  classSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getSingleClassSchedule,
  getAllClassSchedule,
  getAssignedSchedules,
};
