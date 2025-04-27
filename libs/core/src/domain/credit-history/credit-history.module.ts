import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreditHistory } from './entity/credit-history.entity';

@Module({
  imports: [RepositoryModule.forFeatures([CreditHistory])],
  exports: [RepositoryModule],
})
export class CreditHistoryDomainModule {}
