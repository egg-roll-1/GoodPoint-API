import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { VolunteerHistoryController } from './controller/volunteer-history.controller';
import { VolunteerHistoryRepository } from './repository/volunteer-history.repository';
import { VolunteerHistoryService } from './service/volunteer-history.service';

@Module({
  imports: [RepositoryModule.forFeatures([VolunteerHistoryRepository])],
  controllers: [VolunteerHistoryController],
  providers: [VolunteerHistoryService],
  exports: [],
})
export class VolunteerHistoryModule {}
