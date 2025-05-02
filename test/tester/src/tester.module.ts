import { Module } from '@nestjs/common';
import { v1365Module } from './application/v1365/v1365.module';

@Module({
  imports: [v1365Module],
  providers: [],
  controllers: [],
})
export class TesterModule {}
