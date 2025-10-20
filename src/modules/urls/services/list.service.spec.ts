import { ListUrlService } from '@/modules/urls/services/list.service';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';

describe('ListUrlService', () => {
  it('should list all URLs for a user', async () => {
    const repo = FakeUrlRepository();
    const service = ListUrlService(repo);

    await repo.create({
      baseUrl: 'https://example.com/1',
      generatedUrl: 'https://short.ly/1',
      userId: 'user-1',
    });

    await repo.create({
      baseUrl: 'https://example.com/2',
      generatedUrl: 'https://short.ly/2',
      userId: 'user-1',
    });

    const result = await service.execute({
      page: 1,
      orderBy: 'createdAt',
      order: 'asc',
      userId: 'user-1',
    });

    expect(result.totalItems).toBe(2);
    expect(result.items.length).toBe(2);
    expect(result.pages).toBe(1);
  });
});
