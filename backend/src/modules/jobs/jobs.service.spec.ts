import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let prisma: { jobOffer: { create: jest.Mock; update: jest.Mock; findUnique: jest.Mock } };
  let jobsService: JobsService;

  beforeEach(() => {
    prisma = {
      jobOffer: {
        create: jest.fn((args) => args.data),
        update: jest.fn((args) => args.data),
        findUnique: jest.fn(),
      },
    };
    jobsService = new JobsService(prisma as any);
  });

  describe('create', () => {
    it('sets publishedAt when created directly as PUBLISHED', async () => {
      const result = await jobsService.create({ status: 'PUBLISHED' } as any);

      expect(result.publishedAt).toBeInstanceOf(Date);
    });

    it('leaves publishedAt unset when created as DRAFT', async () => {
      const result = await jobsService.create({ status: 'DRAFT' } as any);

      expect(result.publishedAt).toBeUndefined();
    });
  });

  describe('update', () => {
    it('sets publishedAt on the first transition to PUBLISHED', async () => {
      prisma.jobOffer.findUnique.mockResolvedValue({ id: '1', status: 'DRAFT', publishedAt: null });

      const result = await jobsService.update('1', { status: 'PUBLISHED' } as any);

      expect(result.publishedAt).toBeInstanceOf(Date);
    });

    it('does not overwrite publishedAt on a later edit while already published', async () => {
      const originalDate = new Date('2026-01-01T00:00:00.000Z');
      prisma.jobOffer.findUnique.mockResolvedValue({
        id: '1',
        status: 'PUBLISHED',
        publishedAt: originalDate,
      });

      const result = await jobsService.update('1', {
        status: 'PUBLISHED',
        title: 'Nouveau titre',
      } as any);

      expect(result.publishedAt).toBeUndefined();
    });

    it('leaves publishedAt untouched when staying DRAFT', async () => {
      prisma.jobOffer.findUnique.mockResolvedValue({ id: '1', status: 'DRAFT', publishedAt: null });

      const result = await jobsService.update('1', { status: 'DRAFT' } as any);

      expect(result.publishedAt).toBeUndefined();
    });
  });
});
