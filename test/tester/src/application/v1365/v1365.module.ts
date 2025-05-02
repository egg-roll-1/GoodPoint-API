import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { CommonTestModule } from '../../common/common.module';
import { v1365Test } from './v1365.test';

@Module({
  imports: [CoreModule, CommonTestModule],
  providers: [v1365Test],
})
export class v1365Module {}
