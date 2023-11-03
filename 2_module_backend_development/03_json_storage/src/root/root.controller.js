import express from 'express';

import RootService from './root.service.js';
import httpCodes from '../errors/httpCodes.js';

export default class RootController {
  /**
   * @private @type RootService
   */
  _rootService;

  /**
   * @param {RootService} rootService
   */
  constructor(rootService) {
    this._rootService = rootService;
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async saveJsonByUrl(req, res, next) {
    try {
      const success = await this._rootService.saveJsonByUrl(req.url, req.body);

      return res.status(httpCodes.Created).json({ success });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async findJsonByUrl(req, res, next) {
    try {
      const result = await this._rootService.findJsonByUrl(req.url);

      return res.status(httpCodes.Ok).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}
