const DEFAULT_MAX_TRIES = 3;

/**
 * @typedef {Object} Summary
 *
 * @property {number} true
 * @property {number} false
 */

export default class App {
  /**
   * Array of URLs to fetch from.
   *
   * @private
   * @type string[]
   */
  _urls;

  /**
   * Summary info object to store isDone value counters.
   *
   * @private
   * @type Summary
   */
  _summary;

  /**
   * Maximum number of tries to fetch again if previous was failed.
   *
   * @private
   * @type number
   */
  _maxTries;

  /**
   * @param {string[]} urls Array of URL to fetch from.
   * @param {number} maxTries Maximim number of tries to fetch if failed.
   */
  constructor(urls, maxTries = DEFAULT_MAX_TRIES) {
    this._urls = urls;
    this._maxTries = maxTries;
    this._summary = {
      true: 0,
      false: 0,
    };
  }

  async run() {
    for (let url of this._urls) {
      const { result, success } = await this._fetch(url);
      this._logResult(url, result, success);
    }

    this._logSummary();
  }

  /**
   * Fetches data from given URL with specified maximum number of tries if failed.
   *
   * @param {string} url Url to fetch from.
   * @returns {Promise<{ result: Object, success: boolean }>} Result object of fetching.
   */
  async _fetch(url) {
    let tryCount = 0;
    let success = false;
    let result = null;

    while (!success && tryCount < this._maxTries) {
      try {
        const res = await fetch(url);
        success = res.status === 200;
        result = await res.json();
        if (success) this._summary[result.isDone]++; // increment summary counters
      } catch {
        success = false;
      } finally {
        tryCount++;
      }
    }

    return { result, success };
  }

  /**
   * Logs result of fetching from the given URL.
   *
   * @param {string} url Fetched URL.
   * @param {{ isDone: boolean }} obj Object that was received.
   * @param {boolean} success Was fetch success or not.
   */
  _logResult(url, obj, success) {
    const resultStatus = success ? 'Success' : 'Fail';
    const result = success
      ? `isDone - ${obj.isDone ? 'True' : 'False'}`
      : 'The endpoint is unavailable';
    console.log(`[${resultStatus}]: ${url}: ${result}`);
  }

  /**
   * Logs summary information about the result of app execution.
   */
  _logSummary() {
    console.log(`\nFound True values: ${this._summary.true},`);
    console.log(`Found False values: ${this._summary.false}`);
  }
}
