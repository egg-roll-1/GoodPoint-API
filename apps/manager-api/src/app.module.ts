import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerHistoryModule } from './volunteer-history/volunteer-history.module';
import { VolunteerRequestModule } from './volunteer-request/volunteer-request.module';
import { VolunteerWorkModule } from './volunteer-work/volunteer-work.module';

@Module({
  imports: [
    AgencyModule,
    AuthModule,
    VolunteerWorkModule,
    VolunteerHistoryModule,
    VolunteerRequestModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminAppModule {}
