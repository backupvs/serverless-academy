import express from 'express';
import AuthService from '../services/auth.service.js';
import httpCodes from '../errors/httpCodes.js';

export default class AuthController {
  /**
   * @private @type AuthService
   */
  _authService;

  /**
   * @param {AuthService} authService
   */
  constructor(authService) {
    this._authService = authService;
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async signIn(req, res, next) {
    try {
      const { id, refreshToken, accessToken } = await this._authService.signIn(req.body);

      return res.status(httpCodes.Ok).jsonSuccess({
        id,
        refreshToken,
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async signUp(req, res, next) {
    try {
      const { id, refreshToken, accessToken } = await this._authService.signUp(req.body);

      return res.status(httpCodes.Created).jsonSuccess({
        id,
        refreshToken,
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }
}
