import express from 'express';

import { errorHandler } from './common/error-handler.middleware.js';
import JsonRepository from './database/repositories/json.repository.js';
import RootRouter from './root/root.router.js';
import Database from './database/Database.js';

/**
 * @typedef {Object} AppOptions
 *
 * @property {string} host
 * @property {number} port
 */

export default class App {
  /**
   * @private @type express.Express
   */
  _app;

  /**
   * @private @type AppOptions
   */
  _options;

  /**
   * @param {AppOptions} appOptions
   */
  constructor(appOptions) {
    this._options = appOptions;
    this._app = express();
    this._database = new Database();
  }

  async start() {
    const { host, port } = this._options;

    try {
      await this._database.init();
      this._initMiddleware();
      this._initRoutes();
      this._app.use(errorHandler); // Global error handler

      this._app.listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
      });
    } catch (err) {
      console.error('Error while connecting to database:', err.message);
    }
  }

  /** @private */
  _initMiddleware() {
    this._app.use(express.json());
  }

  /** @private */
  _initRoutes() {
    this._app.use('/', new RootRouter(new JsonRepository(this._database.db)).router);
  }
}
