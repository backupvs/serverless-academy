import { Router } from 'express';
import MeController from '../controllers/me.controller.js';
import MeService from '../services/me.service.js';
import { verifyToken } from '../middleware/verifyToken.js';

export default class MeRouter {
  /** @type Router */
  router;

  /**
   * @private @type MeController
   */
  _meController;

  /**
   * @param {MeService} meService
   */
  constructor(meService) {
    this.router = Router();
    this._meController = new MeController(meService);
    this._initRoutes();
  }

  /** @private */
  _initRoutes() {
    this.router.get(
      '/',
      verifyToken,
      this._meController.getCurrentUserData.bind(this._meController)
    );
  }
}
