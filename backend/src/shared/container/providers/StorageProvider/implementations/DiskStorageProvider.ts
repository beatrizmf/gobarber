import fs from 'fs';
import path from 'path';

import storageConfig from '@config/storage';
import IStoreProvider from '@shared/container/providers/StorageProvider/models/IStorageProviders';

export default class DiskStorageProvider implements IStoreProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(storageConfig.tmpFolder, file),
      path.resolve(storageConfig.storagesFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(storageConfig.storagesFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
