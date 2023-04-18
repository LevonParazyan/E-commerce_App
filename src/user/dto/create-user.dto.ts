import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true, description: 'Firstname' })
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, required: true, description: 'Lastname' })
  @Length(2, 20)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: Number, description: 'Age' })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Email should be real email address',
    example: 'namesurname@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description:
      'Password has to match a regular expression:  /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/',
    example: 'pass9876',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password should contain minimum eight characters, at least one letter and one number',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Length(2, 20)
  role: string;
}
