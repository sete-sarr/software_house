import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from '../../mail/mail.service';
import { escapeHtml } from '../../common/utils/escape-html';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateContactRequestDto) {
    const contactRequest = await this.prisma.contactRequest.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        company: dto.company,
        email: dto.email,
        phone: dto.phone,
        projectType: dto.projectType,
        budget: dto.budget,
        timeline: dto.timeline,
        message: dto.message,
        consent: dto.consent,
      },
    });

    const adminEmail = this.configService.get<string>('mail.adminEmail');
    const firstName = escapeHtml(dto.firstName);
    const lastName = escapeHtml(dto.lastName);
    const email = escapeHtml(dto.email);
    const message = escapeHtml(dto.message);

    await Promise.all([
      this.mailService.sendMail({
        to: adminEmail ?? 'admin@example.com',
        subject: `Nouvelle demande de contact — ${dto.firstName} ${dto.lastName}`,
        html: `<p>Nouvelle demande de contact de <strong>${firstName} ${lastName}</strong> (${email}).</p><p>${message}</p>`,
      }),
      this.mailService.sendMail({
        to: dto.email,
        subject: 'Nous avons bien reçu votre message',
        html: `<p>Bonjour ${firstName},</p><p>Nous avons bien reçu votre message et reviendrons vers vous rapidement.</p>`,
      }),
    ]);

    return contactRequest;
  }

  findAll() {
    return this.prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const contactRequest = await this.prisma.contactRequest.findUnique({ where: { id } });

    if (!contactRequest) {
      throw new NotFoundException(`Aucune demande trouvée pour l'id "${id}".`);
    }

    return contactRequest;
  }

  async updateStatus(id: string, status: ContactStatus) {
    await this.findOne(id);
    return this.prisma.contactRequest.update({ where: { id }, data: { status } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.contactRequest.delete({ where: { id } });
  }
}
