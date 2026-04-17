import { FieldError } from '../interfaces/api-response.interface';
import { AppException } from './app.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * Thrown when a requested resource does not exist.
 * Maps to HTTP 404.
 */
export class NotFoundException extends AppException {
  constructor(errors?: FieldError[]) {
    super(
      'El recurso solicitado no fue encontrado.',
      HttpStatus.NOT_FOUND,
      errors,
    );
  }
}
