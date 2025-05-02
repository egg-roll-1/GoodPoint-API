import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { EGExceptionFilter } from './filter/custom-exception.filter';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AopModule } from '@toss/nestjs-aop';

@Module({
  imports: [AopModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: EGExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class GlobalModule {}
