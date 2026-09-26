import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationStatus } from '@prisma/client';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from '../../mail/mail.service';
import { escapeHtml } from '../../common/utils/escape-html';
import { CreateApplicationDto } from './dto/create-application.dto';

type FileField = 'cvUrl' | 'coverLetterUrl';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    dto: CreateApplicationDto,
    cv: Express.Multer.File,
    coverLetter?: Express.Multer.File,
  ) {
    const application = await this.prisma.application.create({
      data: {
        jobOfferId: dto.jobOfferId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        portfolioUrl: dto.portfolioUrl,
        linkedin: dto.linkedin,
        github: dto.github,
        cvUrl: `applications/${cv.filename}`,
        coverLetterUrl: coverLetter ? `applications/${coverLetter.filename}` : undefined,
      },
    });

    const adminEmail = this.configService.get<string>('mail.adminEmail');
    const firstName = escapeHtml(dto.firstName);
    const lastName = escapeHtml(dto.lastName);
    const email = escapeHtml(dto.email);

    // Not awaited: the application is already saved, so the candidate must not wait on SMTP.
    // sendMail never rejects (failures are logged by MailService).
    void Promise.all([
      this.mailService.sendMail({
        to: adminEmail ?? 'admin@example.com',
        subject: `Nouvelle candidature — ${dto.firstName} ${dto.lastName}`,
        html: `<p>Nouvelle candidature spontanée de <strong>${firstName} ${lastName}</strong> (${email}).</p>`,
      }),
      this.mailService.sendMail({
        to: dto.email,
        subject: 'Votre candidature a bien été reçue',
        html: `<p>Bonjour ${firstName},</p><p>Nous avons bien reçu votre candidature et reviendrons vers vous rapidement.</p>`,
      }),
    ]);

    return application;
  }

  findAll() {
    return this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      include: { jobOffer: { select: { title: true } } },
    });
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { jobOffer: { select: { title: true } } },
    });

    if (!application) {
      throw new NotFoundException(`Aucune candidature trouvée pour l'id "${id}".`);
    }

    return application;
  }

  async updateStatus(id: string, status: ApplicationStatus) {
    await this.findOne(id);
    return this.prisma.application.update({ where: { id }, data: { status } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.application.delete({ where: { id } });
  }

  async getFileStream(id: string, field: FileField) {
    const application = await this.findOne(id);
    const relativePath = application[field];

    if (!relativePath) {
      throw new NotFoundException('Fichier introuvable.');
    }

    const uploadDir = this.configService.get<string>('upload.dir') ?? './uploads';
    const fullPath = join(process.cwd(), uploadDir, relativePath);

    if (!existsSync(fullPath)) {
      throw new NotFoundException('Fichier introuvable.');
    }

    return createReadStream(fullPath);
  }
}
