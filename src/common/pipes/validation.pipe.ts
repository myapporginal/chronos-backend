import 'reflect-metadata';
import { ValidationException } from '@common/exceptions/validation.exception';
import {
  Injectable,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';

interface ExposedPropertyMetadata {
  propertyName: string;
  options?: { name?: string };
}

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
        const formattedErrors = flattenErrors(errors);
        return new ValidationException(formattedErrors);
      },
    });
  }
}

/**
 * Recursively flattens nested ValidationError trees into a flat list.
 * Handles both direct constraint errors and nested children (from @ValidateNested).
 */
function flattenErrors(
  errors: ValidationError[],
  parentField?: string,
): { field: string; message: string }[] {
  return errors.flatMap((err) => {
    const fieldName = buildFieldName(err, parentField);

    // This error node has constraint messages → collect them
    if (err.constraints) {
      const messages = Object.values(err.constraints);
      return messages.map((message) => ({
        field: fieldName,
        message: message.replace(err.property, fieldName),
      }));
    }

    // No constraints here → recurse into children (nested DTO)
    if (err.children?.length) {
      return flattenErrors(err.children, fieldName);
    }

    return [];
  });
}

/**
 * Builds the dot-notation field path (e.g. "company.tax_id"),
 * resolving @Expose({ name }) at each level.
 */
function buildFieldName(err: ValidationError, parentField?: string): string {
  const exposedName = resolveExposedName(err);
  return parentField ? `${parentField}.${exposedName}` : exposedName;
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
