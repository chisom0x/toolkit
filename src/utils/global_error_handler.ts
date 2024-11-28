import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response';
import AppError from './app_error';

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.isOperational) {
    errorResponse(res, err.statusCode, err.message);
  } else {
    console.error('ERROR:', err);
    errorResponse(res, err.statusCode, 'Something went wrong!');
  }
};

export default globalErrorHandler;
