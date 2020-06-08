import { container } from 'tsyringe';
import storageConfig from '@config/storage';

import IStorageProvider from './models/IStorageProviders';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[storageConfig.driver],
);
