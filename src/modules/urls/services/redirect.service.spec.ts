import { RedirectUrlService } from '@/modules/urls/services/redirect.service';
import { AppError } from '@/errors/app-error';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';

describe('RedirectUrlService', () => {
  it('should redirect to baseUrl and increment clicks', async () => {
    const repo = FakeUrlRepository();
    const service = RedirectUrlService(repo);

    await repo.create({
      baseUrl: 'https://example.com',
      generatedUrl: 'https://short.ly/abc123',
      userId: 'user-123',
    });

    const param = 'abc123';

    const result = await service.execute(param);

    expect(result).toBe('https://example.com');

    const url = await repo.findByParam(param);
    expect(url?.clicks).toBe(1);
  });

  it('should throw if URL is not found', async () => {
    const repo = FakeUrlRepository();
    const service = RedirectUrlService(repo);

    await expect(service.execute('nonexistent')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
