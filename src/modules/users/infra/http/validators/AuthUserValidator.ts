import Validator, { params } from '@shared/infra/http/validators/Validator';
import Joi from 'joi';

export default class AuthUserValidator extends Validator {
  constructor(param: params) {
    super(param);
    this.schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    this.message = "Email/Password won't match";
  }
}
