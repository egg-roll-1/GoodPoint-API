import { ValidationError } from '@nestjs/common';

/**
 * 클라이언트에서 요청한 내용에 대한 오류를 표현하기 위한 클래스
 */
export class RequestFieldError {
  field: string;
  value: string | number;
  reason: string;

  constructor(field: string, value: string | number, reason: string) {
    this.field = field;
    this.value = value;
    this.reason = reason;
  }

  static of(error: ValidationError): RequestFieldError[] {
    if (error.children?.length > 0) {
      return error.children.map(({ property, value, constraints }) => {
        const reason = constraints ? Object.values(constraints)[0] : '';
        return new RequestFieldError(property, value, reason);
      });
    }

    const { property, value, constraints } = error;
    const reason = Object.values(constraints)[0];
    return [new RequestFieldError(property, value, reason)];
  }
}
