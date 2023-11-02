import IpToLocationDataSource from '../datasource/IpToLocationDataSource.js';
import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';
import IpConverter from '../common/ip-converter.util.js';

export default class CountryService {
  /**
   * @private @type IpToLocationDataSource
   */
  _ipToLocationDataSource;

  /**
   *
   * @param {IpToLocationDataSource} ipToLocationDataSource
   */
  constructor(ipToLocationDataSource) {
    this._ipToLocationDataSource = ipToLocationDataSource;
  }

  /**
   * @param {string} ip
   */
  async getCountryByIp(ip) {
    const entry = this._ipToLocationDataSource.getEntryByIp(ip);

    if (!entry) {
      throw new HttpError(httpCodes.NotFound, 'Country was not found');
    }

    return {
      range: `${IpConverter.decToIp(entry.start)} - ${IpConverter.decToIp(entry.end)}`,
      country: entry.countryName,
    };
  }
}
