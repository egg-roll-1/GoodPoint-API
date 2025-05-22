import { Logger } from '@nestjs/common';
import {
  Aspect,
  createDecorator,
  LazyDecorator,
  WrapParams,
} from '@toss/nestjs-aop';
import safeJsonStringify from 'safe-json-stringify';

export const TIME_LOGGER_DECORATOR = Symbol('TIME_LOGGER_DECORATOR');

export interface TimeLoggingOptions {
  name?: string;
  level?: 'log' | 'warn' | 'auto';
  autoWarnTime?: number;
  showArgument?: boolean;
}

const defaultOptions: TimeLoggingOptions = {
  name: '',
  level: 'auto',
  autoWarnTime: 1000,
  showArgument: false,
};

export const AsyncTimeLogger = (options?: TimeLoggingOptions) =>
  createDecorator(TIME_LOGGER_DECORATOR, options);

@Aspect(TIME_LOGGER_DECORATOR)
export class AsyncTimeLoggerDecorator
  implements LazyDecorator<any, TimeLoggingOptions>
{
  private readonly logger = new Logger('TimeLogger');

  wrap({
    method,
    methodName,
    metadata: _metadata = defaultOptions,
  }: WrapParams<any, TimeLoggingOptions>) {
    return async (...args: any[]) => {
      const start = Date.now();
      const result = await method(...args);
      const costTime = Date.now() - start;

      const metadata = { ...defaultOptions, ..._metadata };
      const {
        name: className,
        autoWarnTime: autoWarnTimeInMilliseconds,
        level: _level,
        showArgument,
      } = metadata;
      const level =
        _level === 'auto'
          ? autoWarnTimeInMilliseconds < costTime
            ? 'warn'
            : 'log'
          : _level;

      const content = [
        `[COST TIME] ${className} ${methodName}: ${costTime}ms`,
        showArgument && args.length > 0
          ? safeJsonStringify(args).slice(0, 200)
          : undefined,
      ]
        .filter((x) => !!x)
        .join('\n');

      if (level === 'log') {
        this.logger.log(content);
      } else {
        this.logger.warn(content);
      }

      return result;
    };
  }
}
