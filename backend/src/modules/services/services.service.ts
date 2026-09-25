import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });

    if (!service) {
      throw new NotFoundException(`Aucun service trouvé pour le slug "${slug}".`);
    }

    return service;
  }
}
