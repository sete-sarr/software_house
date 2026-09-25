import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.jobOffer.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.jobOffer.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const jobOffer = await this.prisma.jobOffer.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });

    if (!jobOffer) {
      throw new NotFoundException(`Aucune offre trouvée pour le slug "${slug}".`);
    }

    return jobOffer;
  }

  async findOne(id: string) {
    const jobOffer = await this.prisma.jobOffer.findUnique({ where: { id } });

    if (!jobOffer) {
      throw new NotFoundException(`Aucune offre trouvée pour l'id "${id}".`);
    }

    return jobOffer;
  }

  create(dto: CreateJobOfferDto) {
    const publishedAt = dto.status === 'PUBLISHED' ? new Date() : undefined;
    return this.prisma.jobOffer.create({ data: { ...dto, publishedAt } });
  }

  async update(id: string, dto: UpdateJobOfferDto) {
    const existing = await this.findOne(id);
    const publishedAt =
      dto.status === 'PUBLISHED' && !existing.publishedAt ? new Date() : undefined;

    return this.prisma.jobOffer.update({
      where: { id },
      data: { ...dto, ...(publishedAt ? { publishedAt } : {}) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.jobOffer.delete({ where: { id } });
  }
}
