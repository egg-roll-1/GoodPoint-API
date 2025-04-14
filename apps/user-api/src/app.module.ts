import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VolunteerHistoryModule } from './volunteer-history/volunteer-history.module';
import { VolunteerRequestModule } from './volunteer-request/volunteer-request.module';
import { VolunteerWorkModule } from './volunteer-work/volunteer-work.module';

@Module({
  imports: [
    AgencyModule,
    AuthModule,
    UserModule,
    VolunteerHistoryModule,
    VolunteerRequestModule,
    VolunteerWorkModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserAppModule {}
