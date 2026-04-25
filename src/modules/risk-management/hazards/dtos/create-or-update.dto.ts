import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrUpdateHazardDto {
  @IsUUID('4', { message: 'La familia de peligro debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'La familia de peligro es requerida.' })
  @Expose({ name: 'hazard_family_id' })
  hazardFamilyId!: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @Expose({ name: 'name' })
  name!: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  @Expose({ name: 'description' })
  description!: string | null;

  @IsString({ message: 'Los efectos posibles deben ser una cadena de texto.' })
  @IsOptional()
  @Expose({ name: 'possible_effects' })
  possibleEffects!: string | null;
}
