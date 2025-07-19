import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from './auth.model';
import { IUsers, TUserLogin } from './auth.interface';

import jwt from 'jsonwebtoken';
import config from '../../config';

// Create Admin
const registerUserIntoDB = async (payload: IUsers) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email Already Registered!');
  }
  const result = await User.create(payload);
  const { _id, name, email, role, createdAt, updatedAt } = result;
  return {
    _id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
  };
};

// logged user
const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  //checking if the password is correct or uncorrect
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not match!');
  }

  const jwtPayload = {
    id: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    },
  );

  return { accessToken, refreshToken };
};

// Registerd Trainer
const registeredTrainerIntoDB = async (payload: IUsers) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email Already Registered!');
  }
  const trainer = { ...payload, role: 'Trainer' };
  const result = await User.create(trainer);
  const { _id, name, email, role, createdAt, updatedAt } = result;
  return {
    _id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
  };
};

// Get Single Trainer
const getSingleTrainerIntoDB = async (email: string) => {
  const result = await User.findOne({ email });
  if (result?.role !== 'Trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Trainer is not Found!');
  }
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Trainer is not Found!');
  }
  return result;
};

// Get All Trainer
const getAllTrainerIntoDB = async () => {
  const result = await User.find();

  const trainer = result.filter((trainer) => trainer.role === 'Trainer');

  //checking user is exists
  if (!trainer) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Trainer is not Found!');
  }
  return trainer;
};

// Get All User
const getAllUserIntoDB = async () => {
  const result = await User.find();

  //checking user is exists
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not Found!');
  }
  return result;
};

// Delete Trainer
const deleteTrainerIntoDB = async (email: string) => {
  const trainer = await User.findOneAndDelete({ email });

  //checking user is exists
  if (trainer?.role !== 'Trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Trainer is not Found!');
  }

  return trainer;
};

// Registered Trainee
const registeredTraineeIntoDB = async (payload: IUsers) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email Already Registered!');
  }
  const trainer = { ...payload, role: 'Trainee' };
  const result = await User.create(trainer);
  const { _id, name, email, role, createdAt, updatedAt } = result;
  return {
    _id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
  };
};
export const authServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  registeredTrainerIntoDB,
  registeredTraineeIntoDB,
  getSingleTrainerIntoDB,
  getAllTrainerIntoDB,
  getAllUserIntoDB,
  deleteTrainerIntoDB,
};
