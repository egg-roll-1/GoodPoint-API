import { ValidationError } from '@nestjs/common';

export class FieldError {
  field: string;
  value: string | number;
  reason: string;

  constructor(field: string, value: string | number, reason: string) {
    this.field = field;
    this.value = value;
    this.reason = reason;
  }

  static of(error: ValidationError): FieldError[] {
    if (error.children?.length > 0) {
      return error.children.map(({ property, value, constraints }) => {
        const reason = constraints ? Object.values(constraints)[0] : '';
        return new FieldError(property, value, reason);
      });
    }

    const { property, value, constraints } = error;
    const reason = Object.values(constraints)[0];
    return [new FieldError(property, value, reason)];
  }
}
