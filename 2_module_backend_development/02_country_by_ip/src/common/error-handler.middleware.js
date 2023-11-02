import express from 'express';
import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';

/**
 * @param {Error | HttpError} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = httpCodes.InternalError;
  let message = 'Internal Error';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err instanceof SyntaxError) {
    statusCode = httpCodes.BadRequest;
    message = err.message;
  }

  if (statusCode === httpCodes.InternalError) console.error(err);

  res.status(statusCode).json({ error: message });
};
