import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { CommonTestModule } from '../../common/common.module';
import { AuthModule } from 'apps/user-api/src/auth/auth.module';
import { UserAuthTest } from './auth/auth.test';

@Module({
  imports: [CoreModule, CommonTestModule, AuthModule],
  providers: [UserAuthTest],
})
export class UserApiTestModule {}
