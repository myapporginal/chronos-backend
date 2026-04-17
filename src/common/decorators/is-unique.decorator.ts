// src/common/validators/is-unique.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export type IsUniqueOptions = {
  entity: new () => any;
  field?: string; // if not passed, use the DTO property name
};

@Injectable()
@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const { entity, field } = args.constraints[0] as IsUniqueOptions;
    const fieldName = field ?? args.property;

    const repo = this.dataSource.getRepository(entity);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const record = await repo.findOne({ where: { [fieldName]: value } });

    return !record; // true = valid (does not exist), false = invalid (already exists)
  }

  defaultMessage(args: ValidationArguments): string {
    const { field } = args.constraints[0] as IsUniqueOptions;
    const fieldName = field ?? args.property;
    return `El valor de '${fieldName}' ya está en uso.`;
  }
}

export function IsUnique(
  options: IsUniqueOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName,
      constraints: [options],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
