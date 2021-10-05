import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';
import 'reflect-metadata';
import log from '@shared/utils/log';
// todo configure production environment
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  log.error(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  
  return response.status(500).json({
    message: 'Internal server error',
  });
});

const port = 3333;
app.listen(port, '127.0.0.1', () => {
  log.info(`Server started on port ${port}!`);
});
