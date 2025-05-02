import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { TagRepository } from './repository/tag.repository';

@Module({
  imports: [RepositoryModule.forFeatures([TagRepository])],
  exports: [RepositoryModule],
})
export class TagDomainModule {}
