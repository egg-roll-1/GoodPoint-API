import { HttpStatus } from '@nestjs/common';
import { ErrorInfo } from 'src/global/exception/code.exception';

/**
 * User 예외 정의
 */
export class UserException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'US001',
    message: '존재하지 않는 사용자입니다.',
  };
}
