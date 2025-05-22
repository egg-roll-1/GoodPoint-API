import { Product } from '@core/domain/product/entity/product.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_item' })
export class OrderItem extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'order_item_id' })
  id: number;

  @Column({ name: 'count', nullable: true })
  count: number;

  @Column({ name: 'price', nullable: true })
  price: number; //1개당 가격

  /**relation */
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'order_id', nullable: true })
  orderId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id', nullable: true })
  productId: number;

  /** 생성 메서드 */
  private static builder() {
    return Builder(OrderItem);
  }

  static create() {}
}
