import { HttpException } from '@nestjs/common';
import { ErrorInfo } from './code.exception';
import { FieldError } from './field.exception';
import { ErrorResponse } from './response.exception';

export class EGException extends HttpException {
  error: ErrorResponse;

  constructor(error: ErrorInfo, errors?: Array<FieldError>) {
    super(ErrorResponse.from(error, errors), error.status);
    this.error = ErrorResponse.from(error, errors);
  }
}
