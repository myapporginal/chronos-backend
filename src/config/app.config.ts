import { ConfigService } from '@common/utils/services/config.service';

export class AppConfigService extends ConfigService {
  constructor(env: Record<string, string | undefined>) {
    super(env);
  }

  port(): number {
    return this.get<number>('PORT', 3000);
  }

  nodeEnv(): string {
    return this.get<string>('NODE_ENV', 'development');
  }

  isProduction(): boolean {
    return this.nodeEnv() === 'production';
  }
}
