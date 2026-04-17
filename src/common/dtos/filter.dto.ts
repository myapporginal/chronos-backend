import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum FilterOperator {
  EQUALS = '=',
  NOT_EQUALS = '!=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  LIKE = 'LIKE',
  IN = 'IN',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
}

export class FilterDto {
  @IsString()
  @IsNotEmpty()
  field!: string;

  @IsEnum(FilterOperator)
  operator!: FilterOperator;

  @IsOptional()
  value?: unknown;
}
