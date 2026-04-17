import 'dotenv/config';

/**
 * Base configuration service that reads typed values from an env map.
 *
 * Subclasses should call `getRequired()` for every critical key during
 * initialization to fail fast if the environment is misconfigured.
 */
export class ConfigService {
  private readonly env: Record<string, string | undefined>;

  constructor(env: Record<string, string | undefined>) {
    this.env = env;
  }

  /**
   * Returns the raw string value for `key`, or `defaultValue` if not set.
   * Throws when the key is absent and no default is provided.
   */
  protected getString(key: string, defaultValue?: string): string {
    const value = this.env[key];

    if (value === undefined || value === '') {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(
        `Configuration error: required environment variable "${key}" is not set.`,
      );
    }

    return value;
  }

  /**
   * Returns a numeric value for `key`.
   * Throws when the value cannot be parsed as a finite number.
   */
  protected getNumber(key: string, defaultValue?: number): number {
    const raw = this.env[key];

    if (raw === undefined || raw === '') {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(
        `Configuration error: required environment variable "${key}" is not set.`,
      );
    }

    const parsed = Number(raw);

    if (!Number.isFinite(parsed)) {
      throw new Error(
        `Configuration error: environment variable "${key}" must be a valid number, got "${raw}".`,
      );
    }

    return parsed;
  }

  /**
   * Returns a boolean value for `key`.
   * Accepts "true"/"1" as truthy and "false"/"0" as falsy (case-insensitive).
   */
  protected getBoolean(key: string, defaultValue?: boolean): boolean {
    const raw = this.env[key];

    if (raw === undefined || raw === '') {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(
        `Configuration error: required environment variable "${key}" is not set.`,
      );
    }

    const lower = raw.toLowerCase();

    if (lower === 'true' || lower === '1') return true;
    if (lower === 'false' || lower === '0') return false;

    throw new Error(
      `Configuration error: environment variable "${key}" must be "true" or "false", got "${raw}".`,
    );
  }

  /**
   * Validates that all listed keys exist in the environment.
   * Call during initialization to catch misconfiguration early.
   */
  public ensureValues(keys: string[]): this {
    const missing = keys.filter((k) => !this.env[k]);

    if (missing.length > 0) {
      throw new Error(
        `Configuration error: the following environment variables are required but not set: ${missing.join(', ')}.`,
      );
    }

    return this;
  }

  public isProduction(): boolean {
    return this.env['NODE_ENV'] === 'production';
  }
}
