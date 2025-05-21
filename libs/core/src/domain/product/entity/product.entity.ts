import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';

@Entity({ name: 'product' })
export class Product extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'sold_out' })
  soldOut: boolean;

  @Column({ name: 'seller' })
  seller: string;

  @Column({ name: 'seller_phone' })
  sellerPhone: string;

  /** 생성 메서드 */
  private static builder() {
    return Builder(Product);
  }

  static create(object: Pick<Product, 'price' | 'seller'> & Partial<Product>) {
    return Product.builder()
      .id(object.id)
      .price(object.price)
      .description(object.description)
      .soldOut(object.soldOut)
      .seller(object.seller)
      .sellerPhone(object.sellerPhone)
      .build();
  }
}
