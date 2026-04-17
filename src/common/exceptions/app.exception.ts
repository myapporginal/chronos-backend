import { FieldError } from '../interfaces/api-response.interface';

/**
 * Base application exception.
 * Extend this class for domain-specific HTTP errors.
 */
export class AppException extends Error {
  public readonly status: number;
  public readonly errors: FieldError[];

  constructor(message: string, status: number, errors: FieldError[] = []) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.errors = errors;
  }
}
