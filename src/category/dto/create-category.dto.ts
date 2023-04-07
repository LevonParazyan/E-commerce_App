import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Option {
  @ApiProperty({ type: String, required: true, description: 'Option name' })
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, description: 'Option name' })
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  type: string;
}

export class CreateCategoryDto {
  @ApiProperty({ type: String, required: true, description: 'Option name' })
  @Length(2, 100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Is a child node',
  })
  @IsBoolean()
  isChild: boolean;

  @ApiProperty({ type: Array, required: false, description: 'Options' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[];

  @ApiProperty({ type: Array, required: false, description: 'Subcategories' })
  @IsOptional()
  subcategories: CreateCategoryDto[];
}
