import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { VolunteerRequestController } from './controller/volunteer-request.controller';
import { VolunteerRequestService } from './service/volunteer-request.service';

@Module({
  imports: [CoreModule],
  providers: [VolunteerRequestService],
  controllers: [VolunteerRequestController],
})
export class VolunteerRequestModule {}
