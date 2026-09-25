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
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactStatusDto } from './dto/update-contact-status.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 600000 } })
  create(@Body() dto: CreateContactRequestDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateContactStatusDto) {
    return this.contactService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
