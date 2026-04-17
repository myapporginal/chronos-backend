import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamsIdDto {
  @ApiProperty({
    description: 'Unique identifier of the resource (UUID v4)',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  @IsUUID()
  id!: string;
}
