import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { GlobalModule } from './global/global.module';
import { InfraCoreModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfraCoreModule, DomainModule, ApplicationModule, GlobalModule],
  exports: [InfraCoreModule, DomainModule, ApplicationModule, GlobalModule],
})
export class CoreModule {}
