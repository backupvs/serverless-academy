import express from 'express';
import MeService from '../services/me.service.js';

export default class MeController {
  /**
   * @private @type MeService
   */
  _meService;

  /**
   * @param {MeService} meService
   */
  constructor(meService) {
    this._meService = meService;
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async getCurrentUserData(req, res, next) {
    try {
      const userData = await this._meService.getCurrentUserData(req.userId);

      return res.status(200).jsonSuccess({
        id: req.userId,
        ...userData,
      });
    } catch (err) {
      next(err);
    }
  }
}
