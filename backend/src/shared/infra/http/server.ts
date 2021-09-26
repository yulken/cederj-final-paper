import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';
import 'reflect-metadata';
// todo configure production environment
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return response.status(500).json({
    message: 'Internal server error',
  });
});

const port = 3333;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}!`);
});
