import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';

@Module({
  imports: [AgencyModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminAppModule {}
