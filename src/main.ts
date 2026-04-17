import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { ExceptionHandlerFilter } from '@common/filters/exception-handler.filter';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /**
   * Set global prefix
   */
  app.setGlobalPrefix('api');

  /**
   * Enable versioning
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /**
   * Set global interceptors
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * Set global pipes
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Set global interceptors
   */
  app.useGlobalInterceptors(new ResponseInterceptor());

  /**
   * Set global filters
   */
  app.useGlobalFilters(new ExceptionHandlerFilter());

  /**
   * Start server
   */
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
