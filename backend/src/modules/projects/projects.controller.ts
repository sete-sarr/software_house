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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('admin/all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllForAdmin() {
    return this.projectsService.findAllForAdmin();
  }

  @Get('id/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
