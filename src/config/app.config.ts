import { ConfigService } from '@common/utils/services/config.service';

export class AppConfigService extends ConfigService {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    super(process.env as Record<string, string | undefined>);
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
