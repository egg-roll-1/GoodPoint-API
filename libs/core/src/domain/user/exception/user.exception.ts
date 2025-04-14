import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * User 예외 정의
 */
export class UserException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'US001',
    message: '존재하지 않는 사용자입니다.',
  };

  static readonly ALREADY_EXIST: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'US002',
    message: '이미 존재하는 사용자입니다.',
  };
}
