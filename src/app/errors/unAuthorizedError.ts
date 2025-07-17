import { TErrorDetails, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const unAuthorizedError = (err: any) => {
  const statusCode = StatusCodes.UNAUTHORIZED;

  return {
    statusCode,
    message: 'Unauthorized access.',
    errorDetails: 'You must be an admin to perform this action.',
  };
};

export default unAuthorizedError;
