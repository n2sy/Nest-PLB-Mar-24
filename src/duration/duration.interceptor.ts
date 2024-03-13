import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();

    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(context.getHandler().name);

        console.log(`Temps de traitement ${dateOut - dateIn}ms`);
      }),
    );
  }
}
