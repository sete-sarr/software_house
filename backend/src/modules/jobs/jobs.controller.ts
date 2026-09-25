import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('admin/all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllForAdmin() {
    return this.jobsService.findAllForAdmin();
  }

  @Get('id/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.jobsService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateJobOfferDto) {
    return this.jobsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateJobOfferDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
