/**
 * Utility class for formatting exchange rate data into human-readable messages.
 * This class provides methods for converting exchange rate data into formatted strings.
 */
export default class ExchangeRateFormatter {
  /**
   * Formats an array of exchange rate data into a single string message.
   *
   * @param {Array} exchangeRateArray Array of exchange rate data.
   * @returns {string} The formatted message with exchange rate information.
   */
  static getFormattedExchangeRateMessage(currency, exchangeRateArray) {
    const header = `--- *${currency}* --- \n\n`;
    const message = exchangeRateArray
      .map((singleExchangeRate) => {
        return this.getFormattedExchangeRateString(singleExchangeRate);
      })
      .join('\n\n');

    return header + message;
  }

  /**
   * Formats a single exchange rate data into a string message.
   *
   * @param {Object} singleExchangeRate Data for a single exchange rate object.
   * @returns {string} The formatted message for a single exchange rate object.
   */
  static getFormattedExchangeRateString(singleExchangeRate) {
    const { currencyB, bankName, buyRate, sellRate } = singleExchangeRate;
    const date = new Date(singleExchangeRate.date).toLocaleString();

    return (
      `*${bankName}*. As at ${date}\n\n` +
      `Buy: *${buyRate}* ${currencyB}\n` +
      `Sell: *${sellRate}* ${currencyB}`
    );
  }
}
