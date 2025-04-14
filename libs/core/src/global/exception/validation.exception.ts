import { ValidationError } from '@nestjs/common';
import { EGException } from './exception';
import { RequestFieldError } from './field.exception';
import { GlobalException } from './global.exception';

export const formatErrors = (errors: Array<ValidationError>) => {
  const fieldErrors = errors.flatMap((m) => RequestFieldError.of(m));
  const invalidRequestException = new EGException(
    GlobalException.BAD_REQUEST,
    fieldErrors,
  );

  return invalidRequestException;
};
