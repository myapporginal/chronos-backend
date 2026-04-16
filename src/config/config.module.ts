// config.module.ts
import { Module, Global } from '@nestjs/common';
import { DatabaseConfigService } from './database.config';
import { AppConfigService } from './app.config';

@Global()
@Module({
  providers: [DatabaseConfigService, AppConfigService],
  exports: [DatabaseConfigService, AppConfigService],
})
export class CustomConfigModule {}
