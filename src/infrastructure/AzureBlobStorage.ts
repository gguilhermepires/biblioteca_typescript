// tem que rodar o yarn add @azure/storage-blob
import crypto from 'crypto';
import * as mime from 'mime-types';

import {
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

import FileManipulation from './fileManipulation';

export default class AzureBlobStorageProvider {
  account: string;

  accountKey: string;

  sharedKeyCredential: StorageSharedKeyCredential;

  container: string;

  createConfiguration(container = '') {
    this.container = container;
    this.account = process.env.AZURE_STORAGE_ACCOUNT || '<account name>';
    this.accountKey = process.env.AZURE_STORAGE_ACCESS_KEY || '';
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      this.account,
      this.accountKey,
    );
  }

  private generateBlobName(fileBuffer: Buffer, mimetype: string): string {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    return `${new Date().getTime()}-${hex}.${mime.extension(mimetype)}`;
  }

  async upload(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    const containerClient = new ContainerClient(
      `https://${this.account}.blob.core.windows.net/${this.container}`,
      this.sharedKeyCredential,
    );
    const fileBuffer = await FileManipulation.openFileSync(file.path);
    if (fileBuffer === undefined) {
      throw new Error('Could not open file');
    }
    if (typeof fileBuffer === 'string') {
      throw new Error('Could not open fileBuffer type invalid');
    }
    const blobName = this.generateBlobName(fileBuffer, file.mimetype);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadData(fileBuffer);
    } catch (error) {
      throw new Error(
        `AzureProvider.upload: ${error}` ||
          'Something went wrong at AzureProvider.upload',
      );
    }
    return { url: blockBlobClient.url, key: blobName };
  }

  async removeFile(blobName: string): Promise<boolean> {
    const containerClient = new ContainerClient(
      `https://${this.account}.blob.core.windows.net/${this.container}`,
      this.sharedKeyCredential,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const result = await blockBlobClient.deleteIfExists({
      deleteSnapshots: 'include',
    });
    return result.succeeded;
  }
}
