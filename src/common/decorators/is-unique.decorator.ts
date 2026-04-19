import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, Not, ObjectLiteral } from 'typeorm';
import { RequestContextService } from '@common/utils/services/request-context.service';

export type IsUniqueOptions = {
  /** The entity class to query. */
  entity: new () => ObjectLiteral;
  /** Column to check — defaults to the decorated property name when omitted. */
  field?: string;
};

@Injectable()
@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly dataSource: DataSource,
    private readonly requestContext: RequestContextService,
  ) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const { entity, field } = args.constraints[0] as IsUniqueOptions;
    const columnName = field ?? args.property;
    const currentId = this.requestContext.getRequest()?.params?.id;

    const repo = this.dataSource.getRepository(entity);

    const whereCondition = {
      [columnName]: value,
    };

    if (currentId) {
      whereCondition.id = Not(currentId);
    }
    console.log(whereCondition);

    const existing = await repo.findOne({ where: whereCondition });
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
