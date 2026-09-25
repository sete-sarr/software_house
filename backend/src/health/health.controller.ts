import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const database: HealthIndicatorFunction = async () => {
      await this.prisma.$queryRaw`SELECT 1`;
      return { database: { status: 'up' } };
    };

    return this.health.check([database]);
  }
}
