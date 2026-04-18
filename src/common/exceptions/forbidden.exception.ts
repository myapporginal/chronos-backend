import { AppException } from './app.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * Thrown when user data is not correct.
 * Maps to HTTP 403.
 */
export class ForbiddenException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Acceso restringido. No tienes permisos para esta sección.',
      HttpStatus.FORBIDDEN,
    );
  }
}
