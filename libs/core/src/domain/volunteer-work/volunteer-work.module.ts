import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { VolunteerTagRepository } from './repository/volunteer-tag.repository';
import { VolunteerWorkRepository } from './repository/volunteer-work.repository';

@Module({
  imports: [
    RepositoryModule.forFeatures([
      VolunteerWorkRepository,
      VolunteerTagRepository,
    ]),
  ],
  exports: [RepositoryModule],
})
export class VolunteerWorkDomainModule {}
