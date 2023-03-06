// tem que rodar o yarn add aws-sdk
import AWS from 'aws-sdk';
import crypto from 'crypto';
import * as fs from 'fs';
import * as mime from 'mime-types';

export default class AWSStorageProvider {
  bucket: string;

  generateLinkFromUploadResult(result: any, fileKey: string) {
    return `https://${this.bucket}.s3.eu-west-3.amazonaws.com/${fileKey}`;
  }

  createConfiguration(containerProvider: string) {
    if (
      process.env.AWS_ACCESS_KEY === undefined ||
      process.env.AWS_SECRET_ACCESS_KEY === undefined ||
      process.env.AWS_REGION === undefined
    )
      throw new Error('AWS credentials can not be empty');

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.bucket = containerProvider;
  }

  generateNameFile(file: Express.Multer.File): string {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fs.readFileSync(file.path));
    const hex = hashSum.digest('hex');
    return `${hex}.${mime.extension(file.mimetype)}`;
  }

  async upload(file: Express.Multer.File, Key: string): Promise<any> {
    const client = new AWS.S3();
    const result = await client
      .putObject({
        Bucket: this.bucket,
        Key,
        Body: fs.readFileSync(file.path),
      })
      .promise();
    return result;
  }

  async removeFile(link: string): Promise<any> {
    const client = new AWS.S3();
    const result = await client
      .deleteObject({
        Bucket: this.bucket,
        Key: link,
      })
      .promise();
    return result;
  }
}
