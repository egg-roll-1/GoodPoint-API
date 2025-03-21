import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { EGResponse } from '../result/response.result';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map<any, EGResponse>((result) => {
        const response: EGResponse = {
          code: '0',
          message: 'Success',
          result: result || null,
        };

        return response;
      }),
    );
  }
}
