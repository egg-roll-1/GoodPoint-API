import { HttpStatus } from '@nestjs/common';
import { ErrorInfo } from 'src/global/exception/code.exception';

export class VolunteerWorkException {
  static readonly NOT_FOUND: ErrorInfo = {
    status: HttpStatus.NOT_FOUND,
    code: 'VW001',
    message: '존재하지 않는 봉사활동이에요!',
  };

  static readonly CANNOT_APPLY_STATUS: ErrorInfo = {
    status: HttpStatus.NOT_ACCEPTABLE,
    code: 'VW002',
    message: '지원할 수 없는 봉사활동이에요!',
  };
}
