import moment from 'moment';

class DataConverter {
  static monthNumberToMonthString(month: number): string {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        throw new Error('Invalid month number to convert for string');
    }
  }

  static diffInDays(startDate: Date, endDate: Date): number {
    return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  }

  static IsEndDateBeforeStartDate(startDate: Date, endDate: Date): boolean {
    return endDate > startDate;
  }

  static getDataNow(): Date {
    return new Date();
  }

  static stringDataToDateObject(dataString: string): Date {
    if (dataString === '' || dataString === null)
      throw new Error('Could not convert a string null to date');
    const momentDate = moment(dataString);
    return momentDate.toDate();
  }

  static dataObjectToString(date: Date, mask = 'DD-MM-YYYY HH:mm:ss'): string {
    return moment(date).format(mask);
  }

  static dataStringDatabaseToStringDataScreen(dataString: string): string {
    const date = this.stringDataToDateObject(dataString);
    return this.dataObjectToString(date, 'DD/MM/YYYY');
  }

  static getMonthStrings() {
    return [
      '',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  static getFrenchMonthStrings() {
    return [
      '',
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];
  }

  static formatLongDate(
    date: Date,
    lang: 'english' | 'french' = 'english',
  ): string {
    let dateString = this.formatDate(date);

    if (dateString.includes('-')) {
      dateString = dateString.replace(/-/g, '/');
    }

    const [day, month, year] = dateString.split('/');

    let monthArr = this.getMonthStrings();

    if (lang === 'french') monthArr = this.getFrenchMonthStrings();

    return `${parseInt(day, 10)} ${monthArr[parseInt(month, 10)]} ${year}`;
  }

  static formatDate(date: Date): string {
    if (!date) return '';

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}

export default DataConverter;
