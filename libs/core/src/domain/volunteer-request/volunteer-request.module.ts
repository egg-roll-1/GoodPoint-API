import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { VolunteerWorkRepository } from '../volunteer-work/repository/volunteer-work.repository';
import { VolunteerRequestRepository } from './repository/volunteer-request.repository';

@Module({
  imports: [
    RepositoryModule.forFeatures([
      VolunteerRequestRepository,
      VolunteerWorkRepository,
    ]),
  ],
  exports: [RepositoryModule],
})
export class VolunteerRequestDomainModule {}
