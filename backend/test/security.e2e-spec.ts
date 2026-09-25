import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { createTestApp } from './utils/create-test-app';

/**
 * Regression guard for the security audit: every admin-only listing endpoint
 * must reject unauthenticated requests. If a JwtAuthGuard is ever removed by
 * accident, this fails immediately instead of silently exposing data.
 */
describe('Protected endpoints (e2e)', () => {
  let app: INestApplication<App>;

  const protectedGetRoutes = [
    '/applications',
    '/contact',
    '/projects/admin/all',
    '/team/admin/all',
    '/testimonials/admin/all',
    '/jobs/admin/all',
  ];

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it.each(protectedGetRoutes)('rejects an unauthenticated GET %s with 401', async (route) => {
    const response = await request(app.getHttpServer()).get(route);
    expect(response.status).toBe(401);
  });

  it.each(protectedGetRoutes)(
    'rejects a request to %s carrying a garbage bearer token',
    async (route) => {
      const response = await request(app.getHttpServer())
        .get(route)
        .set('Authorization', 'Bearer not-a-real-jwt');
      expect(response.status).toBe(401);
    },
  );
});
