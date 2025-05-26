import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OrderService } from '../service/order.service';

@ApiBearerAuth()
@ApiTags('Order API')
@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
