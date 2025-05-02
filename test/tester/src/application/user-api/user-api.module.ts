import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { AuthModule } from 'apps/user-api/src/auth/auth.module';
import { VolunteerWorkModule } from 'apps/user-api/src/volunteer-work/volunteer-work.module';
import { CommonTestModule } from '../../common/common.module';
import { UserAuthTest } from './auth/auth.test';
import { UserMockService } from './mock.service';
import { VolunteerWorkTest } from './volunteer-work/volunteer-work.test';
import { VolunteerRequestModule } from 'apps/user-api/src/volunteer-request/volunteer-request.module';
import { VolunteerWorkRequestTest } from './volunteer-request/volunteer-request.test';

@Module({
  imports: [
    CoreModule,
    CommonTestModule,
    AuthModule,
    VolunteerWorkModule,
    VolunteerRequestModule,
  ],
  providers: [
    UserMockService,
    UserAuthTest,
    VolunteerWorkTest,
    VolunteerWorkRequestTest,
  ],
})
export class UserApiTestModule {}
