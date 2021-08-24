import AppError from '@shared/errors/AppError';
import { Request } from 'express';
import Joi from 'joi';

export type params = 'params' | 'query' | 'body';

export default abstract class Validator {
  schema: Joi.ObjectSchema;

  param: params;

  message: string;

  constructor(param: params) {
    this.param = param;
  }

  validate(request: Request): void {
    if (this.schema.validate(request[this.param]).error) {
      throw new AppError(this.message, 400);
    }
  }
}
