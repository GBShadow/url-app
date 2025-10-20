import { CreateUrlService } from '@/modules/urls/services/create.service';
import { AppError } from '@/errors/app-error';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';
import { Url } from '@prisma/client';

vitest.mock('@/modules/urls/utils', () => ({
  generatedUrlHelper: vitest.fn().mockResolvedValue('https://short.ly/abc123'),
}));

describe('CreateUrlService', () => {
  it('should create a URL without userId', async () => {
    const repo = FakeUrlRepository();
    const service = CreateUrlService(repo);

    const result = await service.execute({
      baseUrl: 'https://google.com',
    });

    expect(result).toHaveProperty('generatedUrl', 'https://short.ly/abc123');
  });

  it('should create a URL with userId if baseUrl is not already used', async () => {
    const repo = FakeUrlRepository();
    const service = CreateUrlService(repo);

    const result = (await service.execute({
      baseUrl: 'https://example.com',
      userId: 'user-123',
    })) as Url;

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('generatedUrl', 'https://short.ly/abc123');
    expect(result.userId).toBe('user-123');
  });

  it('should create a URL without userId', async () => {
    const repo = FakeUrlRepository();
    const service = CreateUrlService(repo);

    const result = (await service.execute({
      baseUrl: 'https://example.com',
    })) as Url;

    expect(result.id).toBe(undefined);
    expect(result.userId).toBe(undefined);
    expect(result).toHaveProperty('generatedUrl', 'https://short.ly/abc123');
  });

  it('should throw an error if baseUrl already exists for the same user', async () => {
    const repo = FakeUrlRepository();
    const service = CreateUrlService(repo);

    await service.execute({
      baseUrl: 'https://example.com',
      userId: 'user-123',
    });

    await expect(
      service.execute({
        baseUrl: 'https://example.com',
        userId: 'user-123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
