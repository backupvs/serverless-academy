import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import IpConverter from '../common/ip-converter.util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @typedef {Object} Entry
 * @property {number} start
 * @property {number} end
 * @property {string} countryCode
 * @property {string} countryName
 */

export default class IpToLocationDataSource {
  /**
   * @private @type filePath
   */
  _filePath;

  /**
   * Array of Entry objects containing location and range data.
   *
   * @private @type Entry[]
   */
  _entries;

  /**
   * Initializes data source by reading and processing a CSV file.
   */
  async init() {
    this._filePath = path.join(__dirname, 'IP2LOCATION-LITE-DB1.CSV');
    const fileData = await fs.readFile(this._filePath, { encoding: 'utf8' });
    const rows = fileData.split(/[\r\n]+/);
    this._entries = this._mapRowsToEntries(rows);
  }

  /**
   * Returns entry object that corresponds to a given IPv4 address.
   *
   * @param {string} ip
   * @returns Entry object containing location and data or null if not found.
   */
  getEntryByIp(ip) {
    const decimalIp = IpConverter.ipToDec(ip);

    for (let entry of this._entries) {
      if (decimalIp >= entry.start && decimalIp <= entry.end) {
        return entry;
      }
    }

    return null;
  }

  /**
   * Maps an array of CSV rows to an array of Entry objects.
   *
   * @param {string[]} rows
   * @returns {Entry[]}
   */
  _mapRowsToEntries(rows) {
    return rows.map((row) => {
      const cols = row
        .split(',') // get columns
        .map((col) => col.slice(1, -1)); // trim quotes

      return {
        start: +cols[0],
        end: +cols[1],
        countryCode: cols[2],
        countryName: cols[3],
      };
    });
  }
}
