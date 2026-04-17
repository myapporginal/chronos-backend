import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppException } from '@common/exceptions/app.exception';
import { Response } from 'express';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionHandlerFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const status =
      (exception as AppException).status || HttpStatus.INTERNAL_SERVER_ERROR;
    const detail = exception.message || 'Internal Server Error';
    const errors = (exception as AppException).errors ?? [];

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // We only log the stack trace in development mode and internal server error
    if (
      process.env.NODE_ENV === 'dev' &&
      status === HttpStatus.INTERNAL_SERVER_ERROR.valueOf()
    ) {
      this.logger.error(
        'Exception caught',
        exception instanceof Error ? exception.stack : '',
      );
    }

    response.status(status).json({
      status,
      detail,
      data: null,
      errors,
    });
  }
}
