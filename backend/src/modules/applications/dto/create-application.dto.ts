import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  jobOfferId?: string;

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
  @MaxLength(5000)
  message?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  portfolioUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  linkedin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  github?: string;
}
