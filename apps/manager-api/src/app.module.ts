import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerWorkModule } from './volunteer-work/volunteer-work.module';

@Module({
  imports: [AgencyModule, AuthModule, VolunteerWorkModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminAppModule {}
