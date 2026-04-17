import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, ObjectLiteral } from 'typeorm';

export type IsUniqueOptions = {
  /** The entity class to query. */
  entity: new () => ObjectLiteral;
  /** Column to check — defaults to the decorated property name when omitted. */
  field?: string;
};

@Injectable()
@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const { entity, field } = args.constraints[0] as IsUniqueOptions;
    const columnName = field ?? args.property;

    const repo = this.dataSource.getRepository(entity);
    const existing = await repo.findOne({
      where: { [columnName]: value } as Record<string, unknown>,
    });

    // Return true (valid) when no existing record is found
    return existing === null;
  }

  defaultMessage(args: ValidationArguments): string {
    const { field } = args.constraints[0] as IsUniqueOptions;
    const columnName = field ?? args.property;
    return `El valor del campo '${columnName}' ya está en uso. Por favor, elige uno diferente.`;
  }
}

export function IsUnique(
  options: IsUniqueOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
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
