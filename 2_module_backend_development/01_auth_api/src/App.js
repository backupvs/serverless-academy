import express from 'express';

import { errorHandler } from './middleware/errorHandler.js';
import { extendResWithJsonSuccess } from './middleware/extendResWithJsonSuccess.js';
import AuthRouter from './routers/auth.router.js';
import AuthService from './services/auth.service.js';
import Database from './database/Database.js';
import UserRepository from './database/repositories/user.repository.js';
import MeRouter from './routers/me.router.js';
import MeService from './services/me.service.js';

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
   * // TODO
   *
   * @private @type Map
   */
  _services;

  /**
   * @private @type Database
   */
  _database;

  /**
   * @param {AppOptions} appOptions
   */
  constructor(appOptions) {
    this._options = appOptions;
    this._app = express();
    this._database = new Database();

    this._initServices();
    this._initMiddleware();
    this._initRoutes();
    this._app.use(errorHandler); // Global error handler
  }

  async start() {
    const { host, port } = this._options;

    try {
      await this._database.init();
      this._app.listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
      });
    } catch (err) {
      console.error('Error while attempting to connect to the database:', err.message);
      this._database.pool.end();
    }
  }

  /** @private */
  _initMiddleware() {
    this._app.use(express.json());
    this._app.use(extendResWithJsonSuccess); // Populate response with jsonSuccess func
  }

  /**
   * Initializes services and repositories for the application
   * to share them across different controllers.
   *
   * @private
   */
  _initServices() {
    this._services = new Map();

    // Repositories
    this._services.set(UserRepository.name, new UserRepository(this._database.pool));

    // Services
    this._services.set(
      AuthService.name,
      new AuthService(this._services.get(UserRepository.name))
    );
    this._services.set(
      MeService.name,
      new MeService(this._services.get(UserRepository.name))
    );
  }

  /** @private */
  _initRoutes() {
    const authService = this._services.get(AuthService.name);
    const meService = this._services.get(MeService.name);

    this._app.use('/auth', new AuthRouter(authService).router);
    this._app.use('/me', new MeRouter(meService).router);
  }
}
