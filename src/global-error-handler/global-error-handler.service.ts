import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { ApiError } from './../common/apiError';

@Catch(ApiError)
export class GlobalErrorHandlerService implements ExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.statusCode).json({
      status: exception.status,
      message: exception.message,
      statusCode: exception.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
