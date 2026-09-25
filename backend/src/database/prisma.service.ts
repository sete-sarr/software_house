import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('database.url'),
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connexion à la base de données établie');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
