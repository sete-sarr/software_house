import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { PrismaService } from '../src/database/prisma.service';
import { createTestApp } from './utils/create-test-app';

describe('Contact (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const createdIds: string[] = [];

  const validPayload = {
    firstName: 'Alex',
    lastName: 'Martin',
    email: 'alex.martin.e2e@example.com',
    message: "Test e2e automatisé, à ignorer.",
    consent: true,
  };

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    if (createdIds.length > 0) {
      await prisma.contactRequest.deleteMany({ where: { id: { in: createdIds } } });
    }
    await app.close();
  });

  it('creates a contact request from a valid payload', async () => {
    const response = await request(app.getHttpServer()).post('/contact').send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body.data.status).toBe('NEW');
    createdIds.push(response.body.data.id);
  });

  it('rejects a payload missing the required consent', async () => {
    const response = await request(app.getHttpServer())
      .post('/contact')
      .send({ ...validPayload, consent: false });

    expect(response.status).toBe(400);
  });

  it('rejects a payload with an invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/contact')
      .send({ ...validPayload, email: 'not-an-email' });

    expect(response.status).toBe(400);
  });

  it('rejects a payload containing a field outside the DTO (mass-assignment protection)', async () => {
    const response = await request(app.getHttpServer())
      .post('/contact')
      .send({ ...validPayload, status: 'CLOSED', isAdmin: true });

    expect(response.status).toBe(400);
  });

  it('rejects a firstName longer than the allowed maximum', async () => {
    const response = await request(app.getHttpServer())
      .post('/contact')
      .send({ ...validPayload, firstName: 'a'.repeat(101) });

    expect(response.status).toBe(400);
  });
});
