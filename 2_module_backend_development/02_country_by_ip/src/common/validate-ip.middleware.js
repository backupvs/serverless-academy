import express from 'express';
import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';

/**
 * @param {Error | HttpError} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const validateIp = (req, res, next) => {
  const ip = (req.headers['x-forwarded-for'] || req.ip || '')
    .split(',')[0] // if several ip, get first
    .trim();

  const isIp = ip && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
  if (!isIp) {
    return next(
      new HttpError(httpCodes.BadRequest, 'Cannot get IP from request or it is not IPv4')
    );
  }

  req.clientIp = ip;
  next();
};
