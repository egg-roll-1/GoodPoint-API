import { Module } from '@nestjs/common';
import { UserApiTestModule } from './application/user-api/user-api.module';
import { v1365Module } from './application/v1365/v1365.module';

@Module({
  imports: [v1365Module, UserApiTestModule],
  providers: [],
  controllers: [],
})
export class TesterModule {}
