import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class OrderException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'OR001',
    message: '존재하지 않는 주문 입니다.',
  };

  static readonly BAD_REQUEST: ErrorInfo = {
    status: HttpStatus.BAD_REQUEST,
    code: 'OR002',
    message: '잘못된 주문 요청입니다.',
  };
}
