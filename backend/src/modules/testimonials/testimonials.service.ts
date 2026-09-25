import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      throw new NotFoundException(`Aucun témoignage trouvé pour l'id "${id}".`);
    }

    return testimonial;
  }

  create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.testimonial.delete({ where: { id } });
  }
}
