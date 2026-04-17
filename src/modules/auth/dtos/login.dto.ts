import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Formato de email inválido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @Length(8, 128, {
    message: 'La contraseña debe tener entre 8 y 128 caracteres',
  })
  password!: string;
}
