import { HttpException } from '@nestjs/common';
import { ErrorInfo } from './code.exception';
import { RequestFieldError } from './field.exception';

/**
 * 예외 응답 형식 정의
 */
export class ErrorResponse {
  status: number;
  code: string;
  message: string;
  errors?: Array<RequestFieldError>;

  public static from(
    errorInfo: ErrorInfo,
    errors: Array<RequestFieldError> = undefined,
  ) {
    const result = new ErrorResponse();
    console.log('error info: ', errorInfo);

    result.status = errorInfo.status;
    result.code = errorInfo.code;
    result.message = errorInfo.message;
    result.errors = errors;

    return result;
  }

  public static fromHttpException(exception: HttpException) {
    const result = new ErrorResponse();

    result.status = exception.getStatus();
    result.code = `G${exception.getStatus()}`;
    result.message = exception.message;

    return result;
  }
}
