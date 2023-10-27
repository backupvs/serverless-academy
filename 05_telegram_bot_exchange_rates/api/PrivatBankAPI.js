import axios from 'axios';
import NodeCache from 'node-cache';

/**
 * Class for interacting with the PrivatBank API to fetch exchange rate data.
 */
export default class PrivatBankAPI {
  /**
   * Name of the bank.
   *
   * @private
   * @type string
   */
  _bankName = 'PrivatBank';

  /**
   * Base URL for PrivatBank API.
   *
   * @private
   * @type string
   */
  _baseURL = 'https://api.privatbank.ua/';

  /**
   * Axios instance for making HTTP requests to the API.
   *
   * @private
   * @type { import('axios').AxiosInstance }
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
      params: {
        exchange: null,
        coursid: 5,
      },
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
      const { data } = await this._httpClient.get('/p24api/pubinfo');

      const currencyRate = data.find(
        (e) => e.ccy === currencyA && e.base_ccy === currencyB
      );

      const result = {
        date: Date.now(),
        currencyA: currencyA,
        currencyB: currencyB,
        bankName: this._bankName,
        buyRate: currencyRate.buy,
        sellRate: currencyRate.sale,
      };

      this._cacheStorage.set('lastPrivatbankResponse', result);
      return result;
    } catch (err) {
      console.error(err.message);
      const exists = this._cacheStorage.has('lastPrivatbankResponse');

      // If the request was previously sent from this IP and rate limit does not allow it yet
      // but memory cache is empty.
      if (!exists) {
        throw new Error(
          `Can't get Privatbank exchange rate neither from API nor from cache`
        );
      }

      return this._cacheStorage.get('lastPrivatbankResponse');
    }
  }
}
