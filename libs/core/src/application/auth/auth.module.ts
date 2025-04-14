import { DomainModule } from '@core/domain/domain.module';
import { ACCESS_TOKEN_KEY } from '@core/global/config/const.config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ACCESS_TOKEN_TTL } from './const/auth.const';
import { JwtUtils } from './service/jwt.utils';
@Module({
  imports: [
    DomainModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ACCESS_TOKEN_KEY),
        signOptions: {
          expiresIn: ACCESS_TOKEN_TTL,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtUtils],
  exports: [PassportModule, JwtUtils],
})
export class AuthCoreModule {}
