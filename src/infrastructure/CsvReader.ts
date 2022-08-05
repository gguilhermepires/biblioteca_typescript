import csv from 'csv-parser';
import { createReadStream } from 'fs';

export default class CsvReader {
  static readCsv(path: string): Promise<any[]> {
    const myMap: any = [];
    return new Promise((resolve, _reject) => {
      createReadStream(path)
        .pipe(
          csv({
            separator: ';',
          }),
        )
        .on('data', (row: any) => {
          return myMap.push(row);
        })
        .on('end', () => {
          console.log('Done.');
          resolve(myMap);
        });
    });
  }
}
