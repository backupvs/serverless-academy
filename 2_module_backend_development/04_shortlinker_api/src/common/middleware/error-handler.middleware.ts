import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/http.error';
import { HttpCodes } from '../errors/http-error-codes.enum';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = HttpCodes.InternalError;
  let message = 'Internal Error';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err instanceof SyntaxError) {
    statusCode = HttpCodes.BadRequest;
    message = err.message;
  }

  if (statusCode === HttpCodes.InternalError) console.error(err);

  res.status(statusCode).json({ error: message });
};
