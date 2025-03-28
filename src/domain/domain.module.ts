import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { UserModule } from './user/user.module';
import { VolunteerHistoryModule } from './volunteer-history/volunteer-history.module';
import { VolunteerRequestModule } from './volunteer-request/volunteer-request.module';
import { VolunteerWorkModule } from './volunteer-work/volunteer-work.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AgencyModule,
    VolunteerHistoryModule,
    VolunteerRequestModule,
    VolunteerWorkModule,
    AuthModule,
  ],
  exports: [],
})
export class DomainModule {}
