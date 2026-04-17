import 'reflect-metadata';
import { ValidationException } from '@common/exceptions/validation.exception';
import {
  Injectable,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';

/** Minimal type describing a single @Expose() metadata entry from class-transformer. */
interface ExposedPropertyMetadata {
  propertyName: string;
  options?: { name?: string };
}

/** Minimal interface for the subset of MetadataStorage we rely on. */
interface ExposableMetadataStorage {
  getExposedMetadatas: (
    target: new (...args: unknown[]) => unknown,
  ) => ExposedPropertyMetadata[];
}

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.flatMap((err) => {
          const messages = Object.values(err.constraints ?? {});
          const fieldName = resolveExposedName(err);

          return messages.map((message) => ({
            field: fieldName,
            // Replace internal property name with the API-facing exposed name
            message: message.replace(err.property, fieldName),
          }));
        });

        return new ValidationException(formattedErrors);
      },
    });
  }
}

/**
 * Resolves the API-facing field name declared via @Expose({ name: '...' }).
 * Falls back to the TypeScript property name when no @Expose() is present.
 */
function resolveExposedName(err: ValidationError): string {
  const targetConstructor = err.target?.constructor as
    | (new (...args: unknown[]) => unknown)
    | undefined;

  if (!targetConstructor) return err.property;

  const storage = defaultMetadataStorage as unknown as ExposableMetadataStorage;
  const exposedProps = storage.getExposedMetadatas(targetConstructor);
  const match = exposedProps.find((m) => m.propertyName === err.property);

  return match?.options?.name ?? err.property;
}
