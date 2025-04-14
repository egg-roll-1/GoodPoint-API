import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EGException } from '../exception/exception';

@Catch(EGException)
export class EGExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: EGException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const responseBody = exception.error;
    return response.status(responseBody.status).json(responseBody);
  }
}
