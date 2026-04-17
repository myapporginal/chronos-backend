import { AppException } from './app.exception';

/**
 * Exception thrown when a requested resource is not found.
 * Extends the AppException class with a 404 HTTP status code.
 *
 * @example
 * throw new NotFoundException("Resource not found", [{ resourceId: 123 }]);
 */
export class NotFoundException extends AppException {
  constructor(errors?: unknown[]) {
    super('Un recurso no fue encontrado', 404);
    if (errors) {
      this.setErrors(errors);
    }
  }
}
