import { Collection, Db } from 'mongodb';

export default class JsonRepository {
  /**
   * @private @type Collection<Document>
   */
  _dataSource;

  /**
   * @param {Db} dataSource
   */
  constructor(dataSource) {
    this._dataSource = dataSource.collection('jsonDocuments');
  }

  /**
   * @param {string} url
   * @returns {Promise<object | null>} A JSON object if found, otherwise null.
   */
  async findByUrl(url) {
    const result = await this._dataSource.findOne({ url });

    return result?.data || null;
  }

  /**
   * @param {string} url
   * @param {object} data
   * @returns {Promise<boolean>} True if created, false otherwise.
   */
  async saveByUrl(url, data) {
    const result = await this._dataSource.insertOne({
      url,
      data,
    });

    return result.acknowledged;
  }
}
