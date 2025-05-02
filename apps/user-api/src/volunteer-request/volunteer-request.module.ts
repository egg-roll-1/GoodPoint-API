import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { VolunteerRequestController } from './controller/volunteer-request.controller';
import { VolunteerRequestService } from './service/volunteer-request.service';

@Module({
  imports: [CoreModule],
  controllers: [VolunteerRequestController],
  providers: [VolunteerRequestService],
  exports: [VolunteerRequestService],
})
export class VolunteerRequestModule {}
