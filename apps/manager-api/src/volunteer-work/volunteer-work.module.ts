import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { VolunteerWorkController } from './controller/volunteer-work.controller';
import { VolunteerWorkService } from './service/volunteer-work.service';

@Module({
  imports: [CoreModule],
  providers: [VolunteerWorkService],
  controllers: [VolunteerWorkController],
})
export class VolunteerWorkModule {}
