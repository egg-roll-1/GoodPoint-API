import { OrderRepository } from '@core/domain/order/repository/order.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}
  // 주문 요청을 받아서,
  // 주문
  // 1. 상품이 유효한지  (사용자 유효 )
  // 2. 사용자 잔액이 있는지 ( 잔액 크래딧딧)
  // 3. 주문을 만들어서 저장 (orderItem, creditHistory)
}
