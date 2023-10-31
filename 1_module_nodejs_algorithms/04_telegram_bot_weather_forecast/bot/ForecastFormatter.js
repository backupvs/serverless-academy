/**
 * Utility class for formatting weather forecast data into human-readable messages.
 * This class provides methods for converting forecast data into formatted strings.
 */
export default class ForecastFormatter {
  /**
   * Formats an array of forecast data into a single string message.
   *
   * @param {Array} forecastArray Array of forecast data.
   * @returns {string} The formatted message with forecast information.
   */
  static getFormattedForecastMessage(forecastArray) {
    return forecastArray
      .map((singleForecast) => {
        return this.getFormattedForecastString(singleForecast);
      })
      .join('\n\n');
  }

  /**
   * Formats a single forecast data into a string message.
   *
   * @param {Object} singleForecast Data for a single forecast object.
   * @returns {string} The formatted message for a single forecast object.
   */
  static getFormattedForecastString(singleForecast) {
    const temp = Math.round(singleForecast.main.temp);
    const pressure = singleForecast.main.pressure;
    const weather = singleForecast.weather;
    const windSpeed = Math.round(singleForecast.wind.speed);

    return (
      `*${singleForecast.dt_txt}*\n` +
      `🌡️ *${temp}°C*\n` +
      `🙃 Pressure: *${pressure} mm Hg*\n` +
      `🌅 Weather: *${weather.map((w) => w.description).join(', ')}*\n` +
      `🌬️ Wind speed: *${windSpeed} mph*`
    );
  }
}
