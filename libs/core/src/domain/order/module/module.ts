import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { OrderItemRepository } from '../repository/order-item.repository';
import { OrderRepository } from '../repository/order.repository';

@Module({
  imports: [
    RepositoryModule.forFeatures([OrderRepository, OrderItemRepository]),
  ],
  exports: [RepositoryModule],
})
export class OrderDomainModule {}
