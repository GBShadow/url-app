import { FakeUserRepository } from '../../../../test/repositories/fake-user.repositoy';
import { ListUserService } from './list.service';

describe('ListUserService', () => {
  const fakeRepo = FakeUserRepository();
  const service = ListUserService(fakeRepo);

  it('should return paginated users list', async () => {
    await fakeRepo.create({
      email: 'user1@example.com',
      name: 'User 1',
      password: 'pass1',
    });

    await fakeRepo.create({
      email: 'user2@example.com',
      name: 'User 2',
      password: 'pass2',
    });

    const result = await service.execute({
      page: 1,
      orderBy: 'name',
      order: 'asc',
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.totalItems).toBeGreaterThan(0);
  });
});
