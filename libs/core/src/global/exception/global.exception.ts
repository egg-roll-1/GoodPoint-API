import { HttpStatus } from '@nestjs/common';
import { ErrorInfo } from './code.exception';

/**
 * Global 예외 정의
 */
export class GlobalException {
  static readonly SERVER_ERROR: ErrorInfo = {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'GL001',
    message: '내부 서버 오류입니다.',
  };

  static readonly BAD_REQUEST: ErrorInfo = {
    status: HttpStatus.BAD_REQUEST,
    code: 'GL002',
    message: '잘못된 요청입니다.',
  };

  static readonly NOT_ACCEPTABLE: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'GL003',
    message: '처리할 수 없는 상태입니다.',
  };

  static readonly ENTITY_NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'GL004',
    message: '존재하지 않는 데이터입니다.',
  };
}
