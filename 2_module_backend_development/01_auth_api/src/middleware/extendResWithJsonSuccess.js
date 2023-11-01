import express from 'express';

/**
 * Extends response object with jsonSuccess method to send wrapped result.
 *
 * @param {Error | HttpError} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const extendResWithJsonSuccess = (req, res, next) => {
  res.jsonSuccess = (data) => res.json({ success: true, data });
  next();
};
