import express from 'express';

import { errorHandler } from './common/error-handler.middleware.js';
import IpToLocationDataSource from './datasource/IpToLocationDataSource.js';
import CountryRouter from './country/country.router.js';

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
   * @private @type IpToLocationDataSource
   */
  _ipToLocationDataSource;

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
    this._ipToLocationDataSource = new IpToLocationDataSource();

    this._initMiddleware();
    this._initRoutes();
    this._app.use(errorHandler); // Global error handler
  }

  async start() {
    try {
      const { host, port } = this._options;
      await this._ipToLocationDataSource.init();
      this._app.listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
      });
    } catch (err) {
      console.error('Cannot initialize datasource:', err.message);
    }
  }

  /** @private */
  _initMiddleware() {
    this._app.use(express.json());
  }

  /** @private */
  _initRoutes() {
    this._app.use('/country', new CountryRouter(this._ipToLocationDataSource).router);
  }
}
