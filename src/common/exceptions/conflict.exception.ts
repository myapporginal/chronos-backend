import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { FieldError } from '@common/interfaces/api-response.interface';

export class ConflictException extends AppException {
  constructor(message?: string, errors?: FieldError[]) {
    super(
      message ?? 'Existe un conflicto con el recurso solicitado.',
      HttpStatus.CONFLICT,
      errors,
    );
  }
}
