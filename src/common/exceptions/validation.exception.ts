import { HttpStatus } from '@nestjs/common';
import { FieldError } from '../interfaces/api-response.interface';
import { AppException } from './app.exception';

/**
 * Thrown when incoming data fails validation rules.
 * Maps to HTTP 422.
 */
export class ValidationException extends AppException {
  constructor(errors?: FieldError[]) {
    super(
      'Los datos enviados contienen errores. Por favor, revísalos e inténtalo de nuevo.',
      HttpStatus.UNPROCESSABLE_ENTITY,
      errors,
    );
  }
}
