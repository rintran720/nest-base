import { IsArray, IsString } from 'class-validator';
import { ERoleStatus } from '../interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  name: string;

  @IsString()
  status: ERoleStatus;

  @IsArray()
  @IsString({ each: true })
  actions: string[];
}
