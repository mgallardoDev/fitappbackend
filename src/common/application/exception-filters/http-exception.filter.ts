import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../api-responses/api.response';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
     
    const jsonResponse: ApiResponse<Error> = {
      status,
      error: exception,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      message: exception.message
    };

    response.status(status).json(jsonResponse);
  }
}
