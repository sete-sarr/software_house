import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  authorRole?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;
}
