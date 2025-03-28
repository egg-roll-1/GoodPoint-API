import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { EGException } from 'src/global/exception/exception';
import { AuthException } from '../exception/auth.exception';
import { JwtUtils } from '../service/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  async validate(req: Request) {
    try {
      const token = await this.jwtUtils.extractAccessTokenFromHeader(req);
      const user = await this.jwtUtils.verifyAccessTokenWithExpiration(token);

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
