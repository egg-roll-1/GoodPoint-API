import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { GlobalException } from '../exception/global.exception';
import { ErrorResponse } from '../exception/response.exception';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    console.error('error: ', exception);

    const errorResponse = ErrorResponse.from(GlobalException.SERVER_ERROR);
    return response.status(errorResponse.status).json(errorResponse);
  }
}
