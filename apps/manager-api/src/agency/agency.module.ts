import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { AgencyController } from './controller/agency.controller';
import { AgencyService } from './service/agency.service';

@Module({
  imports: [CoreModule],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [],
})
export class AgencyModule {}
