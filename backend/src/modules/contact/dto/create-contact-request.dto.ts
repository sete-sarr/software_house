import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  company?: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  projectType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  budget?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  timeline?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message: string;

  @ApiProperty()
  @IsBoolean()
  @Equals(true, { message: 'Vous devez accepter que vos données soient utilisées pour vous recontacter.' })
  consent: boolean;
}
