import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const activeUser = {
    id: 'user-1',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('CorrectPassword123!', 10),
    isActive: true,
  };

  let prisma: { user: { findUnique: jest.Mock } };
  let jwtService: { signAsync: jest.Mock };
  let configService: { get: jest.Mock };
  let authService: AuthService;

  beforeEach(() => {
    prisma = { user: { findUnique: jest.fn() } };
    jwtService = { signAsync: jest.fn().mockResolvedValue('signed-token') };
    configService = {
      get: jest.fn((key: string) => {
        const values: Record<string, string> = {
          'jwt.secret': 'test-secret',
          'jwt.expiresIn': '15m',
          'jwt.refreshSecret': 'test-refresh-secret',
          'jwt.refreshExpiresIn': '7d',
        };
        return values[key];
      }),
    };

    authService = new AuthService(prisma as any, jwtService as any, configService as any);
  });

  describe('login', () => {
    it('returns access and refresh tokens for valid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue(activeUser);

      const result = await authService.login({
        email: activeUser.email,
        password: 'CorrectPassword123!',
      });

      expect(result).toEqual({ accessToken: 'signed-token', refreshToken: 'signed-token' });
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    });

    it('rejects an unknown email without revealing the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'nobody@example.com', password: 'whatever' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('rejects a wrong password with the same generic message as an unknown email', async () => {
      prisma.user.findUnique.mockResolvedValue(activeUser);

      const unknownEmailError = await authService
        .login({ email: 'nobody@example.com', password: 'whatever' })
        .catch((error) => error);
      const wrongPasswordError = await authService
        .login({ email: activeUser.email, password: 'WrongPassword' })
        .catch((error) => error);

      expect(wrongPasswordError).toBeInstanceOf(UnauthorizedException);
      expect(wrongPasswordError.message).toBe(unknownEmailError.message);
    });

    it('rejects a deactivated user even with the correct password', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...activeUser, isActive: false });

      await expect(
        authService.login({ email: activeUser.email, password: 'CorrectPassword123!' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('issues new tokens for an active user', async () => {
      prisma.user.findUnique.mockResolvedValue(activeUser);

      const result = await authService.refresh(activeUser.id, activeUser.email);

      expect(result).toEqual({ accessToken: 'signed-token', refreshToken: 'signed-token' });
    });

    it('rejects when the user no longer exists', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.refresh('deleted-user', 'x@example.com')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
