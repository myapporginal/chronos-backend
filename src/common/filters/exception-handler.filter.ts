import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AppException } from '@common/exceptions/app.exception';
import { FieldError } from '@common/interfaces/api-response.interface';
import { Response } from 'express';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionHandlerFilter.name);

  private isAppException(exception: unknown): exception is AppException {
    return exception instanceof AppException;
  }

  private isNotFoundException(
    exception: unknown,
  ): exception is NotFoundException {
    return exception instanceof NotFoundException;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const isAppException = this.isAppException(exception);
    const isNotFoundException = this.isNotFoundException(exception);

    const status = isAppException
      ? exception.status
      : isNotFoundException
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const detail = isAppException
      ? exception.message
      : isNotFoundException
        ? 'El recurso solicitado no existe.'
        : 'Ocurrió un error inesperado. Por favor, inténtalo más tarde.';

    const errors: FieldError[] = isAppException ? exception.errors : [];

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Log stack trace only in development for internal server errors
    if (
      process.env['NODE_ENV'] === 'development' &&
      status.toString() === HttpStatus.INTERNAL_SERVER_ERROR.toString()
    ) {
      const stack =
        exception instanceof Error ? exception.stack : String(exception);
      this.logger.error('Unhandled exception caught by global filter', stack);
    }

    response.status(status).json({
      status,
      detail,
      data: null,
      metadata: null,
      errors,
    });
  }
}
