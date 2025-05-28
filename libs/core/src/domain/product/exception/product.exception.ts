import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class ProductException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'PE001',
    message: '존재하지 않는 제품 입니다.',
  };

  static readonly ZERO_PRODUCT: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'PE002',
    message: '품절된 제품 입니다.',
  };
}
