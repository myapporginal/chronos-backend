import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsEmail,
} from 'class-validator';

export class CreateOrUpdateUserDto {
  @IsUUID('4', { message: 'El id del usuario debe ser un UUID.' })
  @IsOptional()
  @Expose({ name: 'id' })
  id?: string | null;

  @IsUUID('4', { message: 'El id de la compañía debe ser un UUID.' })
  @IsNotEmpty({ message: 'El id de la compañía no puede estar vacío.' })
  @Expose({ name: 'company_id' })
  companyId!: string;

  @IsEmail({}, { message: 'El correo no es válido.' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío.' })
  @Expose()
  email!: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @Expose()
  password!: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @Expose({ name: 'first_name' })
  firstName!: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @Expose({ name: 'last_name' })
  lastName!: string;

  @IsBoolean({ message: 'El estado debe ser un booleano.' })
  @IsOptional()
  isActive!: boolean;
}
