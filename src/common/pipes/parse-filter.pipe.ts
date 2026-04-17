import { PipeTransform, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FilterDto } from '@common/dtos/filter.dto';
import { ValidationException } from '@common/exceptions/validation.exception';

@Injectable()
export class ParseFilterPipe implements PipeTransform<
  string | undefined,
  Promise<FilterDto[]>
> {
  async transform(value: string | undefined): Promise<FilterDto[]> {
    if (!value) {
      return [];
    }

    let parsed: unknown[];

    try {
      const decoded = JSON.parse(decodeURIComponent(value)) as unknown;

      if (!Array.isArray(decoded)) {
        throw new ValidationException([
          {
            field: 'filters',
            message:
              'El formato de los filtros debe ser un arreglo de objetos JSON.',
          },
        ]);
      }

      parsed = decoded;
    } catch (err) {
      if (err instanceof ValidationException) throw err;

      throw new ValidationException([
        {
          field: 'filters',
          message: 'El formato JSON de los filtros no es válido.',
        },
      ]);
    }

    const filters = plainToInstance(FilterDto, parsed);
    const validationResults = await Promise.all(
      filters.map((filter) => validate(filter)),
    );

    const hasErrors = validationResults.some((errors) => errors.length > 0);

    if (hasErrors) {
      throw new ValidationException([
        {
          field: 'filters',
          message:
            'Uno o más filtros no cumplen con el formato requerido (campo: field, operator, value).',
        },
      ]);
    }

    return filters;
  }
}
