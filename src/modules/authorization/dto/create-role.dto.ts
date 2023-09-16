import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

// class CustomObject {
//   @ApiProperty({ example: '1', description: 'The product ID' })
//   id: string;

//   @ApiProperty({ example: 'Widget', description: 'The product name' })
//   name: string;

//   @ApiProperty({ example: 10, description: 'The product price' })
//   price: number;
// }

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    isArray: true,
    type: String,
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  actions: string[];

  // @ApiProperty({
  //   isArray: true,
  //   type: CustomObject,
  // })
  // @IsArray()
  // @IsOptional()
  // objects?: CustomObject[];
}
