import { Repository } from 'typeorm';
import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Order } from '../entity/order.entity';

@CustomRepository(Order)
export class OrderRepository extends Repository<Order> {}
