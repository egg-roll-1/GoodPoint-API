import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ACCESS_TOKEN_KEY } from 'src/global/config/const.config';
import { ACCESS_TOKEN_TTL } from './const/auth.const';
import { JwtUtils } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ACCESS_TOKEN_KEY),
        signOptions: {
          expiresIn: ACCESS_TOKEN_TTL,
          algorithm: 'HS512',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtUtils, JwtStrategy],
})
export class AuthModule {}
