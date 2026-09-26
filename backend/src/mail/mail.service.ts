import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;

  constructor(private readonly configService: ConfigService) {
    this.from = this.configService.get<string>('mail.from') ?? 'no-reply@example.com';
    const host = this.configService.get<string>('mail.host');

    if (!host) {
      this.transporter = null;
      return;
    }

    const port = this.configService.get<number>('mail.port') ?? 587;
    // 465 = implicit TLS from the first byte; other ports (587) upgrade via STARTTLS.
    const secure = port === 465;

    this.transporter = createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.password'),
      },
    });
  }

  async sendMail({ to, subject, html }: SendMailOptions): Promise<void> {
    if (!this.transporter) {
      this.logger.warn(
        `Email non envoyé (SMTP non configuré) — destinataire: ${to}, sujet: "${subject}"`,
      );
      return;
    }

    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html });
    } catch (error) {
      this.logger.error(`Échec de l'envoi d'email à ${to}`, error);
    }
  }
}
