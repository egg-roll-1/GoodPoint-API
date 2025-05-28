import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';

@CustomRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {}
