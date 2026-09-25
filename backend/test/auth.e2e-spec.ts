import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { App } from 'supertest/types';
import { PrismaService } from '../src/database/prisma.service';
import { createTestApp } from './utils/create-test-app';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  const testUser = {
    email: `e2e-auth-test-${Date.now()}@example.com`,
    password: 'E2eTestPassword!42',
  };

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);

    await prisma.user.create({
      data: {
        email: testUser.email,
        passwordHash: await bcrypt.hash(testUser.password, 10),
        firstName: 'E2E',
        lastName: 'Test',
        isActive: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await app.close();
  });

  it('rejects login with the wrong password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: 'not-the-right-password' });

    expect(response.status).toBe(401);
  });

  it('logs in with valid credentials and returns access + refresh tokens', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(201);
    expect(response.body.data.accessToken).toEqual(expect.any(String));
    expect(response.body.data.refreshToken).toEqual(expect.any(String));
  });

  it('exchanges a valid refresh token for a new access token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: loginResponse.body.data.refreshToken });

    expect(response.status).toBe(201);
    expect(response.body.data.accessToken).toEqual(expect.any(String));
  });

  it('rejects a request to a protected route without a token', async () => {
    const response = await request(app.getHttpServer()).get('/applications');

    expect(response.status).toBe(401);
  });

  it('grants access to a protected route with a valid access token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    const response = await request(app.getHttpServer())
      .get('/applications')
      .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);

    expect(response.status).toBe(200);
  });
});
