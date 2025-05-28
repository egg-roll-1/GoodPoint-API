import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class CreditException {
  static readonly NOT_ENOUGH_CREDIT: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'CE001',
    message: '크래딧 잔액이 부족합니다.',
  };
}
