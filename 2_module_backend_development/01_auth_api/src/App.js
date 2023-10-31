import express from 'express';

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
   * @param {AppOptions} appOptions // TODO
   */
  constructor(appOptions) {
    this._options = appOptions;
    this._app = express();

    this._initMiddleware();
    this._initRoutes();
  }

  start() {
    const { host, port } = this._options;
    this._app.listen(port, host, () => {
      console.log(`Listening on ${host}:${port}`);
    });
  }

  _initMiddleware() {}

  _initRoutes() {}
}
