import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class ManagerException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'MA001',
    message: '존재하지 않는 사용자입니다.',
  };

  static readonly ALREADY_EXIST: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'MA002',
    message: '이미 존재하는 사용자입니다.',
  };
}
