import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { CreditHistoryModule } from '../credit-history/credit-history.module';

@Module({
  imports: [CoreModule, CreditHistoryModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
