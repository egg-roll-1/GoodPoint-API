import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { CreditHistoryService } from './service/credit-history.service';

@Module({
  imports: [CoreModule],
  providers: [CreditHistoryService],
  exports: [CreditHistoryService],
})
export class CreditHistoryModule {}
