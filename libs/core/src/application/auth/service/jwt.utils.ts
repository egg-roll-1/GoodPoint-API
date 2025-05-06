import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ACCESS_TOKEN_KEY } from '@core/global/config/const.config';
import { EGException } from '@core/global/exception/exception';
import dayjs from 'dayjs';
import {
  ACCESS_TOKEN_PREFIX,
  ACCESS_TOKEN_SUBJECT,
  ACCESS_TOKEN_TTL_SEC,
  ACCESS_TOKEN_TYPE,
} from '../const/auth.const';
import { TokenUserDto } from '../dto/token-user.dto';
import { AuthException } from '../exception/auth.exception';

@Injectable()
export class JwtUtils {
  private readonly ACCESS_TOKEN_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.ACCESS_TOKEN_KEY = this.configService.get<string>(ACCESS_TOKEN_KEY);
  }

  public async createAccessToken(tokenUser: TokenUserDto) {
    const payload = {
      sub: ACCESS_TOKEN_SUBJECT,
      id: tokenUser.id,
      type: ACCESS_TOKEN_TYPE,
    };

    const expiredAt = dayjs().add(ACCESS_TOKEN_TTL_SEC, 'second').toDate();
    const token: string = await this.jwtService.signAsync(payload);

    return { expiredAt, token };
  }

  public async extractAccessTokenFromHeader(req: Request) {
    const token = req.headers['authorization']?.slice(
      ACCESS_TOKEN_PREFIX.length,
    );

    if (!token) {
      throw new EGException(AuthException.INVALID_JWT);
    }

    return token;
  }

  public async verifyAccessTokenWithExpiration(token: string) {
    return await this.jwtService.verifyAsync<TokenUserDto>(token, {
      secret: this.ACCESS_TOKEN_KEY,
    });
  }

  public async verifyAccessTokenWithoutExpiration(token: string) {
    return await this.jwtService.verifyAsync<TokenUserDto>(token, {
      secret: this.ACCESS_TOKEN_KEY,
      ignoreExpiration: true,
    });
  }
}
