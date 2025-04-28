import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { VolunteerHistoryController } from './controller/volunteer-history.controller';
import { VolunteerHistoryService } from './service/volunteer-history.service';

@Module({
  imports: [CoreModule],
  controllers: [VolunteerHistoryController],
  providers: [VolunteerHistoryService],
  exports: [],
})
export class VolunteerHistoryModule {}
