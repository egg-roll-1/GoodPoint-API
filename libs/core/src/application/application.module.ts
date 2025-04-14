import { Module } from '@nestjs/common';
import { AuthCoreModule } from './auth/auth.module';

@Module({
  imports: [AuthCoreModule],
  exports: [AuthCoreModule],
})
export class ApplicationModule {}
