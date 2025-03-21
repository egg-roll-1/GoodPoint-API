import { HttpException } from '@nestjs/common';
import { ErrorInfo } from './code.exception';
import { FieldError } from './field.exception';

export class ErrorResponse {
  status: number;
  code: string;
  message: string;
  errors?: Array<FieldError>;

  public static from(
    errorInfo: ErrorInfo,
    errors: Array<FieldError> = undefined,
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
