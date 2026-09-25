import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus, JobType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobOfferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ enum: JobType })
  @IsEnum(JobType)
  type: JobType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ enum: ContentStatus })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
