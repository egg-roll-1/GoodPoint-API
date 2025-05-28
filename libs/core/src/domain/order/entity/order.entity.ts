import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { User } from '@core/domain/user/entity/user.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'order' })
export class Order extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  /** relation */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'product_id', nullable: true })
  userId: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  itemList: OrderItem[];

  @OneToMany(() => CreditHistory, (history) => history.order)
  payHistory: CreditHistory[];

  getTotalAmount() {
    return this.itemList.reduce(
      (acc, item) => acc + item.price * item.count,
      0,
    );
  }

  /** 생성 메서드 */
  private static builder() {
    return Builder(Order);
  }

  static create(object: Pick<Order, 'userId'> & Partial<Order>) {
    return Order.builder()
      .id(object.id)
      .userId(object.userId)
      .itemList(object.itemList)
      .payHistory(object.payHistory)
      .build();
  }
}
