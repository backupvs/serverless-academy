import JsonRepository from '../database/repositories/json.repository.js';
import HttpError from '../errors/HttpError.js';
import httpCodes from '../errors/httpCodes.js';

export default class RootService {
  /**
   * @private @type JsonRepository
   */
  _jsonRepository;

  /**
   *
   * @param {JsonRepository} jsonRepository
   */
  constructor(jsonRepository) {
    this._jsonRepository = jsonRepository;
  }

  /**
   * @param {Object} data
   */
  async saveJsonByUrl(url, data) {
    const existedData = await this._jsonRepository.findByUrl(url);

    if (existedData) {
      throw new HttpError(httpCodes.Conflict, 'JSON document already exists at this URL');
    }

    return await this._jsonRepository.saveByUrl(url, data);
  }

  async findJsonByUrl(url) {
    const existedData = await this._jsonRepository.findByUrl(url);

    if (!existedData) {
      throw new HttpError(httpCodes.NotFound, 'There is no JSON document at this URL');
    }

    return existedData;
  }
}
