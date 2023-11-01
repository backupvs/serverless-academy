import express from 'express';
import HttpError from '../../errors/HttpError.js';
import httpCodes from '../../errors/httpCodes.js';

/**
 * Middleware to validate the sign-up data received in the request.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const validateSignUpDto = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError(httpCodes.BadRequest, 'Email and password are required'));
  }

  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!isEmail) {
    return next(new HttpError(httpCodes.BadRequest, 'Invalid email'));
  }

  next();
};
