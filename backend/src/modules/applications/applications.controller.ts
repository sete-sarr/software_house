import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

interface UploadedApplicationFiles {
  cv?: Express.Multer.File[];
  coverLetter?: Express.Multer.File[];
}

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Throttle({ default: { limit: 3, ttl: 600000 } })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  create(@Body() dto: CreateApplicationDto, @UploadedFiles() files: UploadedApplicationFiles) {
    const cv = files.cv?.[0];
    if (!cv) {
      throw new BadRequestException('Le CV est obligatoire (PDF, 5 Mo maximum).');
    }

    return this.applicationsService.create(dto, cv, files.coverLetter?.[0]);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.applicationsService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }

  @Get(':id/cv')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async downloadCv(@Param('id') id: string) {
    const stream = await this.applicationsService.getFileStream(id, 'cvUrl');
    return new StreamableFile(stream, { type: 'application/pdf' });
  }

  @Get(':id/cover-letter')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async downloadCoverLetter(@Param('id') id: string) {
    const stream = await this.applicationsService.getFileStream(id, 'coverLetterUrl');
    return new StreamableFile(stream, { type: 'application/pdf' });
  }
}
