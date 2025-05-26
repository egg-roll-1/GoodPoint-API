import { OrderRepository } from '@core/domain/order/repository/order.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}
}
