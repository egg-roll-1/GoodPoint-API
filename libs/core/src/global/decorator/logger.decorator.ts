import { Logger } from '@nestjs/common';
import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';

export const ASYNC_METHOD_LOGGER_DECORATOR = Symbol(
  'ASYNC_METHOD_LOGGER_DECORATOR',
);

export interface MethodLoggerOptions {
  name?: string;
}

export const AsyncMethodLogger = (options?: MethodLoggerOptions) =>
  createDecorator(ASYNC_METHOD_LOGGER_DECORATOR, options);

@Aspect(ASYNC_METHOD_LOGGER_DECORATOR)
export class AsyncMethodLoggerDecorator
  implements LazyDecorator<any, MethodLoggerOptions>
{
  private readonly logger = new Logger('AsyncMethodLogger');

  wrap({
    method,
    metadata: options,
    methodName,
  }: WrapParams<any, MethodLoggerOptions>) {
    return async (...args: any[]) => {
      const className = options?.name || '';

      // start log
      this.logger.log(`START [${className}] ${methodName}`);

      // execute
      const result = await method(...args);
      return result;
    };
  }
}
