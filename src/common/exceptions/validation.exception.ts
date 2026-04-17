import { AppException } from './app.exception';

/**
 * Exception thrown when validation fails.
 * Extends the AppException class with a 422 HTTP status code.
 *
 * @example
 * throw new ValidationException("Validation failed", [{ field: "email", error: "Invalid format" }]);
 */
export class ValidationException extends AppException {
  constructor(errors?: unknown[]) {
    super('La validación de datos no fue exitosa', 422);
    if (errors) {
      this.setErrors(errors);
    }
  }
}
