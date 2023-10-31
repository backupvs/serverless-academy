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
      const { isDone, success } = await this._fetch(url);
      if (success) this._summary[isDone]++; // increase summary counter
      this._logResult(url, isDone, success);
    }

    this._logSummary();
  }

  /**
   * Fetches data from given URL with specified maximum number of tries if failed.
   *
   * @param {string} url Url to fetch from.
   * @returns {Promise<{ isDone: boolean, success: boolean }>} Fetching result object.
   */
  async _fetch(url) {
    let tryCount = 0;
    let success = false;
    let isDone = null;

    while (!success && tryCount < this._maxTries) {
      try {
        const res = await fetch(url);
        const resultObj = await res.json();
        success = res.status === 200;
        if (success) {
          isDone = this._findIsDoneValue(resultObj);
        }
      } catch {
        success = false;
      } finally {
        tryCount++;
      }
    }

    return { isDone, success };
  }

  /**
   * Traverses an object and finds value of isDone property.
   *
   * @param {object} obj The object to traverse.
   * @returns {boolean | null} isDone value.
   */
  _findIsDoneValue(obj) {
    const stack = [obj];

    while (stack.length > 0) {
      const current = stack.pop();

      // If found boolean isDone, returns value immediately.
      if (typeof current.isDone === 'boolean') {
        return current.isDone;
      }

      // Iterating through properties and push objects to stack
      // to traverse them later.
      Object.keys(current).forEach((key) => {
        if (typeof current[key] === 'object') {
          stack.push(current[key]);
        }
      });
    }

    return null;
  }

  /**
   * Logs result of fetching from the given URL.
   *
   * @param {string} url Fetched URL.
   * @param {boolean} isDone isDone value.
   * @param {boolean} success Whether fetch successfull or not.
   */
  _logResult(url, isDone, success) {
    const resultStatus = success ? 'Success' : 'Fail';
    let result = 'The endpoint is unavailable';

    if (success && typeof isDone === 'boolean') {
      result = `isDone - ${isDone ? 'True' : 'False'}`;
    }
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
