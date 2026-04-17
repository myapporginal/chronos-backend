import { ConfigService } from '@common/utils/services/config.service';

/**
 * Application-level configuration.
 * Reads PORT, NODE_ENV, and CORS settings from the environment.
 */
export class AppConfigService extends ConfigService {
  constructor() {
    super(process.env as Record<string, string | undefined>);
  }

  port(): number {
    return this.getNumber('PORT', 3000);
  }

  nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  corsOrigin(): string {
    return this.getString('CORS_ORIGIN', '*');
  }

  isProduction(): boolean {
    return this.nodeEnv() === 'production';
  }
}
