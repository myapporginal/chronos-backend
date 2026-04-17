import { AppException } from './app.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * Thrown when user data is not correct.
 * Maps to HTTP 401.
 */
export class UnauthorizedException extends AppException {
  constructor() {
    super(
      'Parece que tus datos de inicio de sesión no son correctos. Inténtalo de nuevo o restablece tu contraseña.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
