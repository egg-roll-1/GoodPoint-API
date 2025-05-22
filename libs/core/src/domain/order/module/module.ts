import { RepositoryModule } from '@core/global/repository/repository.module';
import { Module } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Module({
  imports: [RepositoryModule.forFeatures([ProductRepository])],
  exports: [RepositoryModule],
})
export class ProductDomainModule {}
