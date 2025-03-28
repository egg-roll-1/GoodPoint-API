import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenUserDto } from '../dto/token-user.dto';

export const SignedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TokenUserDto;
  },
);
