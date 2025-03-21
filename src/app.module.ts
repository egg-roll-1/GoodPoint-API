import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { GlobalModule } from './global/global.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [GlobalModule, InfraModule, DomainModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
