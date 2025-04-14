import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfraCoreModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfraCoreModule, DomainModule, ApplicationModule],
  exports: [InfraCoreModule, DomainModule, ApplicationModule],
})
export class CoreModule {}
