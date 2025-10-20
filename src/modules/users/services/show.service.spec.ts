import { AppError } from '@/errors/app-error';
import { FakeUserRepository } from '../../../../test/repositories/fake-user.repositoy';
import { ShowUserService } from './show.service';

describe('ShowUserService', () => {
  const fakeRepo = FakeUserRepository();
  const service = ShowUserService(fakeRepo);

  it('should return user when found', async () => {
    const created = await fakeRepo.create({
      email: 'show@example.com',
      name: 'Show User',
      password: 'pass',
    });

    const user = await service.execute({ id: created.id });

    expect(user).toHaveProperty('id', created.id);
  });

  it('should throw if user not found', async () => {
    await expect(service.execute({ id: 'invalid-id' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
