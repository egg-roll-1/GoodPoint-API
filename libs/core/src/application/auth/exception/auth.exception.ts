import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class AuthException {
  static readonly NOT_AUTHENTICATED: ErrorInfo = {
    status: HttpStatus.UNAUTHORIZED,
    code: 'AU001',
    message: '이메일 또는 비밀번호가 일치하지 않습니다.',
  };
  static readonly INVALID_JWT: ErrorInfo = {
    status: HttpStatus.UNAUTHORIZED,
    code: 'AU002',
    message: '올바르지 않은 토큰입니다.',
  };
  static readonly EXPIRED_JWT: ErrorInfo = {
    status: HttpStatus.UNAUTHORIZED,
    code: 'AU003',
    message: '만료된 토큰입니다.',
  };
  static readonly UN_AUTHORIZED: ErrorInfo = {
    status: HttpStatus.UNAUTHORIZED,
    code: 'AU004',
    message: '권한이 없습니다.',
  };
}
