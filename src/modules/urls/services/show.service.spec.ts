import { ShowUrlService } from '@/modules/urls/services/show.service';
import { AppError } from '@/errors/app-error';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';
import { Url } from '@prisma/client';

describe('ShowUrlService', () => {
  it('should return a URL for valid id and userId', async () => {
    const repo = FakeUrlRepository();
    const service = ShowUrlService(repo);

    const created = (await repo.create({
      baseUrl: 'https://example.com',
      generatedUrl: 'https://short.ly/abc123',
      userId: 'user-1',
    })) as Url;

    const url = await service.execute({
      id: created.id,
      userId: 'user-1',
    });

    expect(url).toHaveProperty('id', created.id);
  });

  it('should throw if URL is not found', async () => {
    const repo = FakeUrlRepository();
    const service = ShowUrlService(repo);

    await expect(
      service.execute({ id: 'invalid-id', userId: 'user-1' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
