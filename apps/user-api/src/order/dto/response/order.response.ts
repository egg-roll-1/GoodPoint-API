import { Order } from '@core/domain/order/entity/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class OrderResponse {
  @ApiProperty({ description: '사용자 ID' })
  userId: number;

  @ApiProperty({ description: '제품  ID' })
  productId: number;

  @ApiProperty({ description: 'order ID' })
  id: number;

  static from(order: Order) {
    return Builder(OrderResponse).id(order.id).build();
  }
}
