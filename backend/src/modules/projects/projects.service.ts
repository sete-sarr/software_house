import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });

    if (!project) {
      throw new NotFoundException(`Aucun projet trouvé pour le slug "${slug}".`);
    }

    return project;
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Aucun projet trouvé pour l'id "${id}".`);
    }

    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
  }
}
