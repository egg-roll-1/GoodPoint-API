import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ACCESS_TOKEN_KEY } from 'src/global/config/const.config';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { UserRepository } from '../user/repository/user.repository';
import { ACCESS_TOKEN_TTL } from './const/auth.const';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtUtils } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    RepositoryModule.forFeatures([UserRepository]),
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
  providers: [JwtUtils, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
