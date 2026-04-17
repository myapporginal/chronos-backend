// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((payload) => {
        // The controller can return { detail, data } or only the data
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const detail = payload?.detail ?? 'Operación exitosa';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const data = payload?.data !== undefined ? payload.data : payload;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const statusCode = response.statusCode ?? 200;

        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          status: statusCode,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          detail,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
          errors: null,
        };
      }),
    );
  }
}
