export class ApiError extends Error {
  public status: string;
  public isOperational: boolean;
  constructor(
    public message: string,
    public statusCode?: number,
  ) {
    super(message);

    this.status = String(this.statusCode)[0] === '4' ? 'Fail' : 'Success';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
