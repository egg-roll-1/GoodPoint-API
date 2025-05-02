import { Module } from '@nestjs/common';
import { MyTestDecorator } from './decorator/test.decorator';
import { CoreModule } from '@core/core.module';

@Module({
  imports: [CoreModule],
  providers: [MyTestDecorator],
  exports: [],
})
export class CommonTestModule {}
