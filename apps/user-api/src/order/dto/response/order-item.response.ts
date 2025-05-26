import { OrderItem } from '@core/domain/order/entity/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class OrderItemResponse {
  @ApiProperty({ description: '제품  ID' })
  productId: number;

  @ApiProperty({ description: '제품 개수' })
  oderIdCount: number;

  @ApiProperty({ description: 'order ID' })
  id: number;

  static from(orderItem: OrderItem) {
    return Builder(OrderItemResponse).id(orderItem.id).build();
  }
}
