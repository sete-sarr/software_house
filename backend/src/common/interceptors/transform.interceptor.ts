import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data: T) => {
        if (data instanceof StreamableFile) {
          return data;
        }

        const response: ApiResponse<T> = {
          success: true,
          data,
          timestamp: new Date().toISOString(),
        };

        return response;
      }),
    );
  }
}
