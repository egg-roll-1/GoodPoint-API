import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { CustomRepository } from '@core/global/decorator/repository.decorator';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {
  /**
   * 품절되지 않은 제품만 조회
   */
  async findAvailableProducts(): Promise<Product[]> {
    return this.find({
      where: { isSoldOut: false },
    });
  }

  /**
   * 판매자 기준으로 제품 목록 조회
   */
  async findBySeller(seller: string): Promise<Product[]> {
    return this.find({
      where: { seller },
    });
  }

  // 여기에 필요시 다른 제품 관련 쿼리 메서드도 추가 가능
}
