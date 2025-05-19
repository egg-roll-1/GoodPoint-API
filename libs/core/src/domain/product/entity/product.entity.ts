import { Column, Entity } from 'typeorm';
import { EGBaseEntity } from '@core/global/entity/base.entity';

@Entity({ name: 'product' })
export class Product extends EGBaseEntity {
  @Column({ name: 'product_ID' })
  id: string;

  @Column({ name: 'product_Prize' })
  price: number;

  @Column({ name: 'product_Explain', nullable: true })
  description: string;

  @Column({ name: 'product_Null' })
  isSoldOut: boolean;

  @Column({ name: 'product_Seller' })
  seller: string;

  @Column({ name: 'product_SellerCall' })
  sellerPhone: string;

  @Column({ name: 'product_freight', nullable: true })
  freight: string;

  /** 생성 메서드 */
  static createOne(object: Partial<Product>): Product {
    const product = new Product();
    Object.assign(product, object);
    return product;
  }
}
