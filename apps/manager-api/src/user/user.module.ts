import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ManagerService } from './service/user.service';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
  providers: [ManagerService],
  exports: [],
})
export class UserModule {}
