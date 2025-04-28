import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class VolunteerHistoryException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'VH001',
    message: '존재하지 않는 봉사내역입니다.',
  };

  static readonly ALREADY_EXIST: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'VH002',
    message: '해당 일에 이미 봉사활동 내역이 존재합니다.',
  };
}
