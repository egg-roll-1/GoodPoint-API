import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [CoreModule],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
