import { DocumentType } from '@modules/access-control/common/utils/enums';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateOrUpdateEmployeeDto {
  @IsNotEmpty({ message: 'El centro de trabajo es obligatorio' })
  @Expose({ name: 'work_center_id' })
  @IsUUID('4', { message: 'El ID del centro de trabajo no es válido' })
  workCenterId!: string;

  @IsOptional()
  @Expose({ name: 'position_id' })
  @IsUUID('4', { message: 'El ID del puesto no es válido' })
  positionId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del usuario no es válido' })
  @Expose({ name: 'user_id' })
  userId?: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Expose({ name: 'first_name' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  firstName!: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Expose({ name: 'last_name' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
  lastName!: string;

  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  @Expose({ name: 'document_type' })
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  @Expose({ name: 'document_number' })
  @IsString({ message: 'El número de documento debe ser una cadena de texto' })
  @MinLength(7, {
    message: 'El número de documento debe tener al menos 7 caracteres',
  })
  @IsNumberString({}, { message: 'El número de documento debe ser un número' })
  documentNumber!: string;

  @IsNotEmpty({ message: 'La fecha de ingreso es obligatoria' })
  @Expose({ name: 'entry_date' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de ingreso debe ser una fecha válida, formato YYYY-MM-DD',
    },
  )
  entryDate!: Date;

  @IsOptional()
  @Expose({ name: 'exit_date' })
  @IsDateString(
    {},
    {
      message:
        'La fecha de salida debe ser una fecha válida, formato YYYY-MM-DD',
    },
  )
  exitDate?: Date;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @Expose({ name: 'is_active' })
  isActive?: boolean;
}
