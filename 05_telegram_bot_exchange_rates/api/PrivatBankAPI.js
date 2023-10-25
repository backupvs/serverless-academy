import axios from 'axios';

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

  constructor() {
    this._httpClient = axios.create({
      baseURL: this._baseURL,
      params: {
        exchange: null,
        coursid: 5,
      },
    });
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

      return result;
    } catch (err) {
      console.error(err.message);
    }
  }
}
