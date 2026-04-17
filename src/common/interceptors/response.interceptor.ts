import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';
import {
  ApiResponse,
  PaginationMetadata,
  ServicePayload,
} from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ServicePayload<T> | T>,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((payload) => {
        const typedPayload = payload as ServicePayload<T>;

        const detail = typedPayload?.detail ?? 'Operación completada con éxito';
        const data =
          typedPayload?.data !== undefined ? typedPayload.data : (payload as T);

        const metadata = this.resolveMetadata(typedPayload, request);
        const statusCode = response.statusCode ?? 200;

        return {
          status: statusCode,
          detail,
          data,
          metadata,
          errors: null,
        };
      }),
    );
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  /**
   * Returns pagination metadata when the payload contains `total`, `limit`
   * and `offset`. Returns `null` for non-paginated responses.
   */
  private resolveMetadata(
    payload: ServicePayload<T>,
    request: Request,
  ): PaginationMetadata | null {
    if (payload?.metadata !== undefined) {
      return payload.metadata ?? null;
    }

    const { limit, offset, total } = payload ?? {};

    if (
      typeof limit !== 'number' ||
      typeof offset !== 'number' ||
      typeof total !== 'number'
    ) {
      return null;
    }

    return this.buildPaginationMetadata(limit, offset, total, request);
  }

  /**
   * Computes page numbers and prev/next/last URLs from raw pagination values.
   */
  private buildPaginationMetadata(
    limit: number,
    offset: number,
    total: number,
    request: Request,
  ): PaginationMetadata {
    const page = Math.floor(offset / limit) + 1;
    const maxPage = Math.ceil(total / limit);

    const nextOffset = offset + limit;
    const prevOffset = offset - limit;
    const lastOffset = maxPage > 0 ? (maxPage - 1) * limit : 0;

    return {
      next_url:
        nextOffset < total ? this.buildUrl(request, limit, nextOffset) : null,
      back_url:
        prevOffset >= 0 ? this.buildUrl(request, limit, prevOffset) : null,
      latest_url: total > 0 ? this.buildUrl(request, limit, lastOffset) : null,
      page,
      max_page: maxPage,
    };
  }

  /**
   * Builds an absolute URL preserving all current query params except
   * `offset` and `limit`, which are replaced with the provided values.
   */
  private buildUrl(request: Request, limit: number, offset: number): string {
    const host = request.get('host') ?? '';
    const base = `${request.protocol}://${host}${request.baseUrl || ''}${request.path}`;
    const url = new URL(base);

    for (const [key, value] of Object.entries(request.query)) {
      if (key !== 'offset' && key !== 'limit') {
        url.searchParams.append(key, value as string);
      }
    }

    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    return url.toString();
  }
}
