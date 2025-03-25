import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { AgencyController } from './controller/agency.controller';
import { AgencyRepository } from './repository/agency.repository';
import { AgencyService } from './service/agency.service';

@Module({
  imports: [RepositoryModule.forFeatures([AgencyRepository])],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [],
})
export class AgencyModule {}
