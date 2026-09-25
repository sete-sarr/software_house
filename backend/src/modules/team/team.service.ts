import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  findAllForAdmin() {
    return this.prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });

    if (!member) {
      throw new NotFoundException(`Aucun membre trouvé pour l'id "${id}".`);
    }

    return member;
  }

  create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({ data: dto });
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    await this.findOne(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.teamMember.delete({ where: { id } });
  }
}
