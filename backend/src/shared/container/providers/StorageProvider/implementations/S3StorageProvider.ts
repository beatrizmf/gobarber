import fs from 'fs';
import mime from 'mime';
import path from 'path';
import aws from 'aws-sdk';

import storageConfig from '@config/storage';
import IStoreProvider from '@shared/container/providers/StorageProvider/models/IStorageProviders';

export default class S3StorageProvider implements IStoreProvider {
  private client: aws.S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(storageConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('file not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: storageConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
