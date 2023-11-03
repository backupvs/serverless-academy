import { Router } from 'express';
import RootService from './root.service.js';
import RootController from './root.controller.js';

export default class RootRouter {
  /** @type Router */
  router;

  /**
   * @private
   * @type RootController
   */
  _rootController;

  constructor(jsonRepository) {
    this.router = Router();
    const rootService = new RootService(jsonRepository);
    this._rootController = new RootController(rootService);
    this._initRoutes();
  }

  /** @private */
  _initRoutes() {
    this.router.get('*', this._rootController.findJsonByUrl.bind(this._rootController));
    this.router.post('*', this._rootController.saveJsonByUrl.bind(this._rootController));

    // Forbid all other methods
    this.router.all('*', (req, res, next) =>
      res.status(405).json({ success: false, error: 'Method not allowed' })
    );
  }
}
