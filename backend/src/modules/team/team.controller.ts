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
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamService } from './team.service';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get('admin/all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllForAdmin() {
    return this.teamService.findAllForAdmin();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateTeamMemberDto) {
    return this.teamService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
