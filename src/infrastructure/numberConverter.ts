export default class NumberConverter {
  static numberToString(num: number, decimalPlaceNumber: number): string {
    return num.toFixed(decimalPlaceNumber);
  }

  static stringNumberToFloat(
    number: string | null | undefined,
    delimiter = '.',
  ): number {
    if (number === '' || number === null || number === undefined) return 0;
    if (delimiter === '.') return parseFloat(number);
    return parseFloat(number.replace(delimiter, '.'));
  }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
