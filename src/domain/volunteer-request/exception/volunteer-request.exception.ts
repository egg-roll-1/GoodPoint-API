import { HttpStatus } from '@nestjs/common';
import { ErrorInfo } from 'src/global/exception/code.exception';

export class VolunteerRequestException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'VR001',
    message: '존재하지 않는는 봉사신청내역입니다.',
  };
}
