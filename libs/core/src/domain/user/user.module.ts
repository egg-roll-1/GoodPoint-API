import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [RepositoryModule.forFeatures([UserRepository])],
  exports: [RepositoryModule],
})
export class UserDomainModule {}
