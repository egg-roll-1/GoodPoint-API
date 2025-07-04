import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AopModule } from '@toss/nestjs-aop';
import { AsyncMethodLoggerDecorator } from './decorator/logger.decorator';
import { AsyncTimeLoggerDecorator } from './decorator/time.decorator';
import { EGExceptionFilter } from './filter/custom-exception.filter';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ResponseInterceptor } from './interceptor/response.interceptor';

@Module({
  imports: [AopModule],
  providers: [
    AsyncTimeLoggerDecorator,
    AsyncMethodLoggerDecorator,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class GlobalModule {}
