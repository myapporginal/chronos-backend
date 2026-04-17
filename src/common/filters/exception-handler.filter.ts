import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppException } from '@common/exceptions/app.exception';
import { FieldError } from '@common/interfaces/api-response.interface';
import { Response } from 'express';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionHandlerFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const isAppException = exception instanceof AppException;

    const status = isAppException
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const detail = isAppException
      ? exception.message
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
