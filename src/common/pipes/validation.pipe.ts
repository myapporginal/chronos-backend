import 'reflect-metadata';
import { ValidationException } from '@common/exceptions/validation.exception';
import {
  Injectable,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';

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
            message: message.replace(err.property, fieldName), // replace the property name with the exposed name
          }));
        });

        return new ValidationException(formattedErrors);
      },
    });
  }
}

function resolveExposedName(err: ValidationError): string {
  const targetClass = err.target?.constructor;

  if (!targetClass) return err.property;

  // TODO: Fix this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const exposedProps = defaultMetadataStorage.getExposedMetadatas(targetClass);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const match = exposedProps.find(
    (m: { propertyName: string }) => m.propertyName === err.property,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return match?.options?.name ?? err.property;
}
