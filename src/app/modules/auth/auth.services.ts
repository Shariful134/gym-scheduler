import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from './auth.model';
import { TUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

type TStudent = {
  name: string;
  email: string;
  role: string;
};

// CreateUser
const registerUserIntoDB = async (payload: TStudent) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email Already Registered!');
  }
  const result = await User.create(payload);

  return result;
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

export const authServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
