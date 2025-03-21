import { ValidationError } from '@nestjs/common';
import { EGException } from './exception';
import { FieldError } from './field.exception';
import { GlobalException } from './global.exception';

export const formatErrors = (errors: Array<ValidationError>) => {
  const fieldErrors = errors.flatMap((m) => FieldError.of(m));
  const invalidRequestException = new EGException(
    GlobalException.BAD_REQUEST,
    fieldErrors,
  );

  return invalidRequestException;
};
