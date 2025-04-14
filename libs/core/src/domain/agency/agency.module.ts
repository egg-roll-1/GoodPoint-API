import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../global/repository/repository.module';
import { AgencyRepository } from './repository/agency.repository';

@Module({
  imports: [RepositoryModule.forFeatures([AgencyRepository])],
  exports: [RepositoryModule],
})
export class AgencyDomainModule {}
