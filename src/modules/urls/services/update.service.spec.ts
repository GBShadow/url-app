import { UpdateUrlService } from '@/modules/urls/services/update.service';
import { AppError } from '@/errors/app-error';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';
import { Url } from '@prisma/client';

vitest.mock('@/modules/urls/utils', () => ({
  generatedUrlHelper: vitest.fn().mockResolvedValue('https://short.ly/new'),
}));

describe('UpdateUrlService', () => {
  it('should update baseUrl and regenerate short URL', async () => {
    const repo = FakeUrlRepository();
    const service = UpdateUrlService(repo);

    const created = (await repo.create({
      baseUrl: 'https://old.com',
      generatedUrl: 'https://short.ly/old',
      userId: 'user-1',
    })) as Url;

    const updated = await service.execute(created.id, {
      baseUrl: 'https://new.com',
      userId: 'user-1',
    });

    expect(updated.baseUrl).toBe('https://new.com');
    expect(updated.generatedUrl).toBe('https://short.ly/new');
  });

  it('should throw if URL not found', async () => {
    const repo = FakeUrlRepository();
    const service = UpdateUrlService(repo);

    await expect(
      service.execute('nonexistent', {
        baseUrl: 'https://new.com',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw if new baseUrl already exists for same user', async () => {
    const repo = FakeUrlRepository();
    const service = UpdateUrlService(repo);

    await repo.create({
      baseUrl: 'https://existing.com',
      generatedUrl: 'https://short.ly/exist',
      userId: 'user-1',
    });

    const url2 = (await repo.create({
      baseUrl: 'https://other.com',
      generatedUrl: 'https://short.ly/other',
      userId: 'user-1',
    })) as Url;

    await expect(
      service.execute(url2.id, {
        baseUrl: 'https://existing.com',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
