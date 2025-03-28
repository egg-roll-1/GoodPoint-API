import { HttpStatus } from '@nestjs/common';
import { ErrorInfo } from 'src/global/exception/code.exception';

export class AuthException {
  static readonly NOT_AUTHENTICATED: ErrorInfo = {
    status: HttpStatus.UNAUTHORIZED,
    code: 'AU001',
    message: '올바르지 않은 인증정보입니다.',
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
}
