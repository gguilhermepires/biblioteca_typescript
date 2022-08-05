import { Request } from 'express';
import multer from 'multer';
import path from 'path';

import FileManipulation from '../infrastructure/fileManipulation';

class UploadCsv {
  private URL: string = path.basename('uploads');

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!FileManipulation.existFolderSync(this.URL)) {
          FileManipulation.createFolderSync(this.URL);
        }
        cb(null, this.URL);
      },
      filename: (req, file, cb) => {
        const type = this.extractFileType(file.mimetype);
        cb(null, `${new Date().getTime()}.${type}`);
      },
    });
  }

  private extractFileType(mimetype: string) {
    if (mimetype === '') return '';
    let vetor = mimetype.split('/');
    if (vetor.length > 1) return vetor[vetor.length - 1];
    vetor = mimetype.split('.');
    if (vetor.length > 1) return vetor[vetor.length - 1];
    return vetor[0];
  }

  private fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback,
    ) => {
      const conditions = ['csv'];
      if (conditions.includes(`${this.extractFileType(file.mimetype)}`)) {
        cb(null, true);
      }
      cb(null, false);
    };
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      fileFilter: this.fileFilter(),
    };
  }
}

export const uploadCsv = new UploadCsv();
