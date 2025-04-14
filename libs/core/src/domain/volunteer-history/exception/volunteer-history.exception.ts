import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class VolunteerHistoryException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'VH001',
    message: '존재하지 않는 봉사내역입니다.',
  };
}
