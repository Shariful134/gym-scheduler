import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../config';

//register User
const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration Successfully',
    data: [result],
  });
});

//login User
const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successfully!',
    data: [accessToken],
  });
});

//Registered Trainer
const registerdTrainer = catchAsync(async (req, res) => {
  const result = await authServices.registeredTrainerIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trainer Registration Successfully',
    data: [result],
  });
});

//getSingle Trainer
const getSingleTrainer = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await authServices.getSingleTrainerIntoDB(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trainer Retrived Successfully',
    data: [result],
  });
});

//getAll Trainer
const getAllTrainer = catchAsync(async (req, res) => {
  const result = await authServices.getAllTrainerIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trainer Retrived Successfully',
    data: result,
  });
});

//getAll Trainer
const getAllUser = catchAsync(async (req, res) => {
  const result = await authServices.getAllUserIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All User Retrived Successfully',
    data: result,
  });
});

//getAll Trainer
const deleteTrainer = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await authServices.deleteTrainerIntoDB(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trainer Deleted Successfully',
    data: result,
  });
});

//Registered Trainee
const registerdTrainee = catchAsync(async (req, res) => {
  const result = await authServices.registeredTraineeIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trainee Registration Successfully',
    data: [result],
  });
});

export const authControllers = {
  registerUser,
  loginUser,
  registerdTrainer,
  registerdTrainee,
  getSingleTrainer,
  getAllUser,
  getAllTrainer,
  deleteTrainer,
};
