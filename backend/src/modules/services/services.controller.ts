import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}
