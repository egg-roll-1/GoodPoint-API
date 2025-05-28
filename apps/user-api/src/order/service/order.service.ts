import { Order } from '@core/domain/order/entity/order.entity';
import { OrderException } from '@core/domain/order/exception/order.exception';
import { OrderItemRepository } from '@core/domain/order/repository/order-item.repository';
import { OrderRepository } from '@core/domain/order/repository/order.repository';
import { Product } from '@core/domain/product/entity/product.entity'; //제품 엔티티
import { ProductException } from '@core/domain/product/exception/product.exception';
import { ProductRepository } from '@core/domain/product/repository/product.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { CreditHistoryService } from '../../credit-history/service/credit-history.service';
import { OrderRequest } from '../dto/request/order.request';
import { Transactional } from 'typeorm-transactional';
@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderItemRepository: OrderItemRepository,
    private readonly productService: ProductRepository, // 상품 유효성 확인용
    private readonly creditHistoryService: CreditHistoryService, //크래딧
  ) {}

  @Transactional()
  async order(userId: number, request: OrderRequest) {
    for (const orderItemRequest of request.orderItem) {
      const product = await this.isAvailableProductOrThrow(
        orderItemRequest.productId,
      );

      if (product.price !== orderItemRequest.price) {
        throw new EGException(OrderException.BAD_REQUEST);
      }
    }

    const order = await this.orderRepository.save(Order.create({ userId }));
    const orderItemList = await this.orderItemRepository.save(
      request.orderItem.map((dto) => dto.toEntity(order.id)),
    );

    order.itemList = orderItemList;
    const totalAmount = order.getTotalAmount();

    await this.creditHistoryService.createUsage({
      userId,
      orderId: order.id,
      amount: totalAmount,
    });

    return order;
  }

  private async isAvailableProductOrThrow(productId: number): Promise<Product> {
    const product = await this.productService
      .findOneOrFail({
        where: { id: productId },
      })
      .catch(() => {
        throw new EGException(ProductException.NOT_FOUND);
      });

    if (product.soldOut) {
      throw new EGException(ProductException.ZERO_PRODUCT);
    }

    return product;
  }
}
