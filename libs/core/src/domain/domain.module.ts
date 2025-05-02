import { Module } from '@nestjs/common';
import { AgencyDomainModule } from './agency/agency.module';
import { CreditHistoryDomainModule } from './credit-history/credit-history.module';
import { ManagerDomainModule } from './manager/manager.module';
import { TagDomainModule } from './tag/tag.module';
import { UserDomainModule } from './user/user.module';
import { VolunteerHistoryDomainModule } from './volunteer-history/volunteer-history.module';
import { VolunteerRequestDomainModule } from './volunteer-request/volunteer-request.module';
import { VolunteerWorkDomainModule } from './volunteer-work/volunteer-work.module';

const MODULE_LIST = [
  UserDomainModule,
  AgencyDomainModule,
  ManagerDomainModule,
  VolunteerHistoryDomainModule,
  VolunteerRequestDomainModule,
  VolunteerWorkDomainModule,
  CreditHistoryDomainModule,
  TagDomainModule,
];

@Module({
  imports: MODULE_LIST,
  exports: MODULE_LIST,
})
export class DomainModule {}
