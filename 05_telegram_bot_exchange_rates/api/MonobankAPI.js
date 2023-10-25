import axios from 'axios';
import { currencyCodesMap } from '../utils.js';
import NodeCache from 'node-cache';
// import mono from '../test/mono.json' assert { type: 'json' };

/**
 * Class for interacting with the Monobank API to fetch exchange rate data.
 */
export default class MonobankAPI {
  /**
   * Name of the bank.
   *
   * @private
   * @type string
   */
  _bankName = 'Monobank';

  /**
   * Base URL for Monobank API.
   *
   * @private
   * @type string
   */
  _baseURL = 'https://api.monobank.ua/';

  /**
   * Axios instance for making HTTP requests to the API.
   *
   * @private
   * @type import('axios').AxiosInstance
   */
  _httpClient;

  /**
   * Cache storage for storing API responses.
   *
   * @private
   * @type NodeCache
   */
  _cacheStorage;

  /**
   * @param {NodeCache} cacheStorage Cache storage for storing API responses.
   */
  constructor(cacheStorage) {
    this._httpClient = axios.create({
      baseURL: this._baseURL,
    });

    this._cacheStorage = cacheStorage;
  }

  /**
   * Retrieves the exchange rate between two currencies.
   *
   * @param {string} currencyA Source currency.
   * @param {string} currencyB Target currency. 'UAH' by default.
   * @returns {object} Object with exchange rate information.
   */
  async getExchangeRate(currencyA, currencyB = 'UAH') {
    try {
      const { data } = await this._httpClient.get('/bank/currency');

      const currencyCodeA = currencyCodesMap[currencyA];
      const currencyCodeB = currencyCodesMap[currencyB];

      const currencyRate = data.find(
        (e) => e.currencyCodeA === currencyCodeA && e.currencyCodeB === currencyCodeB
      );

      const result = {
        date: currencyRate.date * 1000,
        currencyA: currencyA,
        currencyB: currencyB,
        bankName: this._bankName,
        buyRate: currencyRate.rateBuy,
        sellRate: currencyRate.rateSell,
      };

      this._cacheStorage.set('lastMonobankResponse', result);
    } catch (err) {
      if (err.response?.status !== axios.HttpStatusCode.TooManyRequests) {
        console.error(err.message);
      }

      const exists = this._cacheStorage.has('lastMonobankResponse');

      // If the request was previously sent from this IP and rate limit does not allow it yet
      // but memory cache is empty.
      if (!exists) {
        throw new Error(
          `Can't get Monobank exchange rate neither from API nor from cache`
        );
      }

      return this._cacheStorage.get('lastMonobankResponse');
    }
  }
}
