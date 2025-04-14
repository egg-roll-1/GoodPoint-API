import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { VolunteerWorkRepository } from './repository/volunteer-work.repository';

@Module({
  imports: [RepositoryModule.forFeatures([VolunteerWorkRepository])],
  exports: [RepositoryModule],
})
export class VolunteerWorkDomainModule {}
