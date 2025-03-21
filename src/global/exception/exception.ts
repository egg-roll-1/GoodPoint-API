import { HttpException } from '@nestjs/common';
import { ErrorInfo } from './code.exception';
import { RequestFieldError } from './field.exception';
import { ErrorResponse } from './response.exception';

/**
 * 프로젝트를 위한 커스텀 예외클래스 정의
 */
export class EGException extends HttpException {
  error: ErrorResponse;

  constructor(error: ErrorInfo, errors?: Array<RequestFieldError>) {
    super(ErrorResponse.from(error, errors), error.status);
    this.error = ErrorResponse.from(error, errors);
  }
}
