import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  problem?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  solution?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  result?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @ApiPropertyOptional({ enum: ContentStatus })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seoDescription?: string;
}
