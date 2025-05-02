import {
  Aspect,
  createDecorator,
  LazyDecorator,
  WrapParams,
} from '@toss/nestjs-aop';
import { Transactional } from 'typeorm-transactional';
import { ForRollbackException } from '../exception/rollback.exception';
import {
  BackgroundColor,
  coloredText,
  TextColor,
} from '../utility/console.utility';
import { EGException } from '@core/global/exception/exception';
import { ErrorInfo } from '@core/global/exception/code.exception';

export const MY_TEST_DECORATOR = Symbol('MY_TEST_DECORATOR');

export interface TestOptions {
  name?: string;
  description?: string;
  expectError?: ErrorInfo;
}

export const MyTest = (options?: TestOptions) =>
  createDecorator(MY_TEST_DECORATOR, options);

@Aspect(MY_TEST_DECORATOR)
export class MyTestDecorator implements LazyDecorator<any, TestOptions> {
  wrap({ method, metadata, methodName }: WrapParams<any, TestOptions>) {
    return async (...args: any[]) => {
      try {
        const result = await this.runner(method, args);
        return result;
      } catch (error) {
        if (!metadata?.expectError && error instanceof ForRollbackException) {
          console.log(
            [
              coloredText(
                `[SUCCESS] ${methodName}`,
                TextColor.White,
                BackgroundColor.Green,
              ),
              coloredText(metadata?.name || ''),
            ].join(' '),
          );
          return;
        }

        if (error instanceof EGException && metadata?.expectError) {
          const response = error.error;
          const realErrorCode = response.code;

          const isSuccess = metadata.expectError?.code === realErrorCode;

          if (isSuccess) {
            console.log(
              [
                coloredText(
                  `[SUCCESS] ${methodName}`,
                  TextColor.White,
                  BackgroundColor.Green,
                ),
                coloredText(metadata?.name || ''),
              ].join(' '),
            );
            return;
          }
        }

        console.log(
          [
            coloredText(
              `[FAILED] ${methodName}`,
              TextColor.White,
              BackgroundColor.Red,
            ),
            metadata?.name || '',
            '/',
            metadata?.description || '',
          ].join(' '),
        );
        console.error(error);
      }
    };
  }

  @Transactional()
  private async runner(method, args) {
    await method(...args);
    throw new ForRollbackException();
  }
}
