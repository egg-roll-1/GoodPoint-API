import { OrderItem } from '@core/domain/order/entity/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OrderItemRequest {
  @ApiProperty({ description: '주문할 개수' })
  @IsNumber()
  count: number;

  @ApiProperty({ description: '상품 ID' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: '상품 가격' })
  @IsNumber()
  price: number;

  toEntity(orderId: number) {
    return OrderItem.create({
      orderId,
      productId: this.productId,
      price: this.price,
      count: this.count,
    });
  }
}
