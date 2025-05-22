import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import dayjs from 'dayjs';
import { catchError, Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    const { method, url } = request;
    console.log(
      `[REQ] ${method} ${url} ${dayjs().format('YYYY/MM/DD HH:mm:ss')}`,
    );

    return next.handle().pipe(
      catchError((e) => {
        const delay = Date.now() - now;
        console.log(
          `[ERR] ${method} ${url} ${dayjs().format('YYYY/MM/DD HH:mm:ss')} ${delay}ms`,
          e,
        );
        throw e;
      }),
      tap(() => {
        const delay = Date.now() - now;
        console.log(
          `[RES] ${method} ${url} ${dayjs().format('YYYY/MM/DD HH:mm:ss')} ${delay}ms`,
        );
      }),
    );
  }
}
