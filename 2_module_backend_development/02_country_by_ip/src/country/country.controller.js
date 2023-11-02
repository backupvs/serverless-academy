import express from 'express';
import CountryService from './country.service.js';
import httpCodes from '../errors/httpCodes.js';

export default class CountryController {
  /**
   * @private @type CountryService
   */
  _countryService;

  constructor(countryService) {
    this._countryService = countryService;
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async getCountryByIp(req, res, next) {
    try {
      const result = await this._countryService.getCountryByIp(req.clientIp);

      res.status(httpCodes.Ok).json(result);
    } catch (err) {
      next(err);
    }
  }
}
