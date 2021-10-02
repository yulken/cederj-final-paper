import { ValidationResult } from 'joi';
import ValidationError from '../errors/ValidationError';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  err.errors.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
}

export function validateInput(validation: ValidationResult): void {
  if (validation?.error) {
    throw new ValidationError(
      validation.error.details.map(error => ({
        message: error.message,
        path: error.path[0],
      })),
    );
  }
}
