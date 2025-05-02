import { ErrorInfo } from '@core/global/exception/code.exception';
import { HttpStatus } from '@nestjs/common';

export class VolunteerRequestException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'VR001',
    message: '존재하지 않는 봉사신청내역입니다.',
  };

  static readonly ALREADY_EXIST: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'VR002',
    message: '이미 신청한 봉사활동입니다.',
  };
}
