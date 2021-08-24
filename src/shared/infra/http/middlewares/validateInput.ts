import { Request, Response, NextFunction, RequestHandler } from 'express';
import Validator from '../validators/Validator';

export default function validateInput(validator: Validator): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    validator.validate(request);
    next();
  };
}
