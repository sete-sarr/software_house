import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    return this.buildTokens(user.id, user.email);
  }

  async refresh(userId: string, email: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Utilisateur introuvable.');
    }

    return this.buildTokens(user.id, email);
  }

  private async buildTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.secret'),
        expiresIn: this.configService.get<string>('jwt.expiresIn') as JwtSignOptions['expiresIn'],
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>(
          'jwt.refreshExpiresIn',
        ) as JwtSignOptions['expiresIn'],
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
