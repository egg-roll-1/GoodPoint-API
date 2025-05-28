import { IsArray, ValidateNested } from 'class-validator';
import { OrderItemRequest } from './order-item.request';
import { ApiProperty } from '@nestjs/swagger';

export class OrderRequest {
  @ApiProperty({
    description: '주문아이템 목록',
    isArray: true,
    type: OrderItemRequest,
  })
  @IsArray()
  @ValidateNested({ each: true })
  orderItem: OrderItemRequest[];
}
