/* eslint-disable security/detect-non-literal-fs-filename */

import AdmZip from 'adm-zip';
import * as fs from 'fs';

import { IFile } from '../interfaces/iReport';
import DataConverter from './dataConverter';

class FileManipulation {
  static async moveFileSync(file: IFile, newPath: string): Promise<void> {
    console.log(file.path);
    console.log(newPath);

    await fs.renameSync(file.path, newPath);

    if (this.existFileSync(newPath) === false)
      throw new Error(`Could not move file ${file.name}`);
  }

  static existFileSync(path: string): boolean {
    return fs.existsSync(path);
  }

  static async zipFiles(listFiles: IFile[]): Promise<IFile> {
    const zip = new AdmZip();
    for await (const file of listFiles) {
      zip.addLocalFile(file.path);
    }
    const zipFileName = `zip_${DataConverter.getDataNow().getTime()}.zip`;
    zip.writeZip(zipFileName);
    return { path: zipFileName, name: zipFileName };
  }

  static existFolderSync(filePath: string): boolean {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      return false;
    }
  }

  static async removeFileSync(filePath: string): Promise<boolean> {
    try {
      fs.rmSync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async openFileSync(filePath: string): Promise<Buffer | undefined> {
    try {
      return fs.readFileSync(filePath);
    } catch (error) {
      return undefined;
    }
  }

  static async createFolderSync(filePath: string): Promise<boolean> {
    try {
      fs.mkdirSync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default FileManipulation;
