export default class IpConverter {
  /**
   * Converts an IPv4 address to decimal representation.
   *
   * @param {string} ip
   * @returns {number} Decimal representation of IPv4 address.
   */
  static ipToDec(ip) {
    const parts = ip.split('.');

    const octet1Decimal = +parts[0] * 256 ** 3;
    const octet2Decimal = +parts[1] * 256 ** 2;
    const octet3Decimal = +parts[2] * 256;
    const octet4Decimal = +parts[3];

    return octet1Decimal + octet2Decimal + octet3Decimal + octet4Decimal;
  }

  /**
   * Converts a decimal representation of an IPv4 address to its string form.
   *
   * @param {number} number
   * @returns {string} The IPv4 address in string form.
   */
  static decToIp(number) {
    const octet1 = (number >>> 24) & 255;
    const octet2 = (number >>> 16) & 255;
    const octet3 = (number >>> 8) & 255;
    const octet4 = number & 255;

    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }
}
