interface Error {
  message: string;
  path: string | number;
}

export default class ValidationError extends Error {
  public readonly errors: Error[];

  constructor(errors: Error[], message = 'Validation Error') {
    super(message);
    this.errors = errors;
  }
}
