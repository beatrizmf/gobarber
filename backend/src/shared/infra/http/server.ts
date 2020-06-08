import 'reflect-metadata';
import 'dotenv/config'

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import routes from './routes';

import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(storageConfig.storagesFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 server started on port 3333');
});
