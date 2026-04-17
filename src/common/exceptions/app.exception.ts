/**
 * Custom application error class.
 * Extends the built-in Error class to include an HTTP status code.
 */
export class AppException extends Error {
  public readonly status: number;
  public errors?: unknown[];

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.errors = [];
  }

  /**
   * Sets additional error details.
   *
   * @param errors An array of error details to set.
   */
  public setErrors(errors: unknown[]): void {
    this.errors = errors;
  }
}
