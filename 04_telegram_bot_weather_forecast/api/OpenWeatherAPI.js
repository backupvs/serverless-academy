import axios from 'axios';

/**
 * @typedef {Object} APIOptions
 *
 * @property {string} version
 * @property {string} units
 */
const defaultOptions = {
  version: '2.5',
  units: 'metric',
};

/**
 * Class for interacting with the OpenWeather API to fetch weather data.
 */
export default class OpenWeatherAPI {
  /**
   * Base URL for OpenWeather API.
   *
   * @private
   * @type string
   */
  _baseURL = 'https://api.openweathermap.org/data/';

  /**
   * API version.
   *
   * @private
   * @type string
   */
  _version;

  /**
   * City name to request weather for.
   *
   * @private
   * @type string
   */
  _city;

  /**
   * Axios instance for making HTTP requests to the API.
   *
   * @private
   * @type { import('axios').AxiosInstance }
   */
  _httpClient;

  /**
   * @param {string} key API key.
   * @param {string} city City name to request weather for.
   * @param {APIOptions} options Options for HTTP Client.
   */
  constructor(key, city, options = {}) {
    this._key = key;
    this._city = city;
    this._version = options.version || defaultOptions.version;
    this._httpClient = axios.create({
      baseURL: `${this._baseURL}${this._version}`,
      params: {
        q: city.toLowerCase(),
        units: options.units || defaultOptions.units,
        appid: key,
      },
    });
  }

  /**
   * Retrieves hourly weather forecast data.
   *
   * @param {'3' | '6'} interval Forecast interval.
   * @returns {Promise<Array>} Forecast data with specified interval.
   */
  async getHourlyForecast(interval) {
    try {
      const { data } = await this._httpClient.get('/forecast');
      const filteredData =
        interval === '3' ? data.list : data.list.filter((_, i) => i % 2 === 0);
      return filteredData;
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   * @returns City name
   */
  getCity() {
    return this._city;
  }
}
