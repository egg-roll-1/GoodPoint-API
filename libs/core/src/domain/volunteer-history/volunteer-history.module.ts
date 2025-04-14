import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { VolunteerHistoryRepository } from './repository/volunteer-history.repository';

@Module({
  imports: [RepositoryModule.forFeatures([VolunteerHistoryRepository])],
  exports: [RepositoryModule],
})
export class VolunteerHistoryDomainModule {}
