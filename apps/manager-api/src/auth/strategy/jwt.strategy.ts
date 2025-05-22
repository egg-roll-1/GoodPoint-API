import { AuthException } from '@core/application/auth/exception/auth.exception';
import { JwtUtils } from '@core/application/auth/service/jwt.utils';
import { Authority } from '@core/domain/user/entity/user.enum';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  async validate(req: Request) {
    const ALLOWED_ROLE = new Set([Authority.ADMIN, Authority.ROLE_MANAGER]);

    try {
      const token = await this.jwtUtils.extractAccessTokenFromHeader(req);
      const user = await this.jwtUtils.verifyAccessTokenWithExpiration(token);

      if (!ALLOWED_ROLE.has(user.authority)) {
        throw new EGException(AuthException.UN_AUTHORIZED);
      }

      return user;
    } catch (error) {
      if (error instanceof EGException) {
        throw error;
      }

      if (error?.message === 'jwt expired') {
        throw new EGException(AuthException.EXPIRED_JWT);
      }
      throw new EGException(AuthException.INVALID_JWT);
    }
  }
}
