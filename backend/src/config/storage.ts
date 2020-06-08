import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IStorageConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  storagesFolder: string;

  multer: {
    storage: multer.StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  storagesFolder: resolve(tmpFolder),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'beatrizf13-gobarber',
    },
  },
} as IStorageConfig;
