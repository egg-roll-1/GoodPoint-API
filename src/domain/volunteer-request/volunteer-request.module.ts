import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { VolunteerRequestController } from './controller/volunteer-request.controller';
import { VolunteerRequestRepository } from './repository/volunteer-request.repository';
import { VolunteerRequestService } from './service/volunteer-request.service';

@Module({
  imports: [RepositoryModule.forFeatures([VolunteerRequestRepository])],
  controllers: [VolunteerRequestController],
  providers: [VolunteerRequestService],
  exports: [],
})
export class VolunteerRequestModule {}
