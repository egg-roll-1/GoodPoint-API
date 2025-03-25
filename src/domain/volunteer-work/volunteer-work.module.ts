import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { VolunteerWorkController } from './controller/volunteer-work.controller';
import { VolunteerWorkRepository } from './repository/volunteer-work.repository';
import { VolunteerWorkService } from './service/volunteer-work.service';

@Module({
  imports: [RepositoryModule.forFeatures([VolunteerWorkRepository])],
  controllers: [VolunteerWorkController],
  providers: [VolunteerWorkService],
  exports: [],
})
export class VolunteerWorkModule {}
