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
};
