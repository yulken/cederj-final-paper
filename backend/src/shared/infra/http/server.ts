import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import log from '@shared/utils/log';
import routes from './routes';
import 'reflect-metadata';
import https from 'https';
import cert from '@config/cert';
// todo configure production environment
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    log.error(err);
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: 'Internal server error',
    });
  },
);

const port = Number(process.env.APP_API_PORT) || 3333;
const address = process.env.APP_API_ADDRESS || 'localhost';

const server = https.createServer(cert, app)

server.listen(port, () => {
  log.info(`Server started => ${address}:${port}!`);
});
