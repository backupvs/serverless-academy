import express from 'express';
import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';
import Jwt from '../thirdparty/Jwt.js';

/**
 * Middleware to verify Bearer access token in the request headers.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = await Jwt.verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(new HttpError(httpCodes.Unauthorized, 'Invalid access token'));
  }
};
