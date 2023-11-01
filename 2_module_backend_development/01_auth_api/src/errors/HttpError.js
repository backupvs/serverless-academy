export default class HttpError extends Error {
  /**
   * @private @type number
   */
  statusCode;

  constructor(statusCode, message = '') {
    super(message);
    this.statusCode = statusCode;
  }
}
