import { Module } from '@nestjs/common';
import { AgencyDomainModule } from './agency/agency.module';
import { UserDomainModule } from './user/user.module';
import { VolunteerHistoryDomainModule } from './volunteer-history/volunteer-history.module';
import { VolunteerRequestDomainModule } from './volunteer-request/volunteer-request.module';
import { VolunteerWorkDomainModule } from './volunteer-work/volunteer-work.module';

const MODULE_LIST = [
  UserDomainModule,
  AgencyDomainModule,
  VolunteerHistoryDomainModule,
  VolunteerRequestDomainModule,
  VolunteerWorkDomainModule,
];

@Module({
  imports: MODULE_LIST,
  exports: MODULE_LIST,
})
export class DomainModule {}
