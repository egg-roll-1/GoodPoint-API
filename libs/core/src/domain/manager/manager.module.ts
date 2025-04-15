import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { ManagerRepository } from './repository/manager.repository';

@Module({
  imports: [RepositoryModule.forFeatures([ManagerRepository])],
  exports: [RepositoryModule],
})
export class ManagerDomainModule {}
