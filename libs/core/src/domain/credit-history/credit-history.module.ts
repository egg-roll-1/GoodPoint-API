import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreditHistoryRepository } from './repository/credit-history.repository';

@Module({
  imports: [RepositoryModule.forFeatures([CreditHistoryRepository])],
  exports: [RepositoryModule],
})
export class CreditHistoryDomainModule {}
