import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { ExceptionHandlerFilter } from '@common/filters/exception-handler.filter';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { AppConfigService } from './config/app.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  // Allow class-validator to resolve NestJS providers (e.g. IsUniqueConstraint)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({ origin: config.corsOrigin() });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new ExceptionHandlerFilter());

  await app.listen(config.port());
}

void bootstrap();
