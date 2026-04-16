import 'dotenv/config';

export class ConfigService {
  private static _instance: unknown;

  private readonly env: Record<string, string | undefined>;

  constructor(env: Record<string, string | undefined>) {
    this.env = env;
  }

  public static instance(env?: Record<string, string | undefined>): unknown {
    if (!ConfigService.instance) {
      if (!env) {
        throw new Error('ConfigService not initialized');
      }
      ConfigService._instance = new ConfigService(env);
    }
    return ConfigService._instance;
  }

  protected get<T = string>(key: string, defaultValue?: T): T {
    const value = this.env[key];

    if (!value && defaultValue !== undefined) {
      return defaultValue;
    }

    return value as T;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.get(k, true));
    return this;
  }

  public isProduction() {
    return this.get<string>('NODE_ENV') === 'production';
  }
}
