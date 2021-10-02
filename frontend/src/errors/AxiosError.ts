export interface IError {
  statusCode: number;
  message: string;
}

export default class AxiosError extends Error {
  public readonly statusCode: number;

  public readonly message: string;

  constructor(error: IError, message = 'Request Error') {
    super(message);
    this.message = error.message;
    this.statusCode = error.statusCode;
  }
}
