import { Router } from 'express';
import CountryService from './country.service.js';
import CountryController from './country.controller.js';
import { validateIp } from '../common/validate-ip.middleware.js';

export default class CountryRouter {
  /** @type Router */
  router;

  /**
   * @private
   * @type CountryController
   */
  _countryController;

  constructor(ipToLocationDataSource) {
    this.router = Router();
    const countryService = new CountryService(ipToLocationDataSource);
    this._countryController = new CountryController(countryService);
    this._initRoutes();
  }

  /** @private */
  _initRoutes() {
    this.router.get(
      '/',
      validateIp,
      this._countryController.getCountryByIp.bind(this._countryController)
    );
  }
}
