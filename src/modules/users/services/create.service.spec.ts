import { hash } from 'bcryptjs';
import { AppError } from '@/errors/app-error';
import { FakeUserRepository } from '../../../../test/repositories/fake-user.repositoy';
import { CreateUserService } from './create.service';
import { Mock } from 'vitest';
import { User } from '@prisma/client';

vitest.mock('bcryptjs');

describe('CreateUserService', () => {
  const fakeRepo = FakeUserRepository();
  const service = CreateUserService(fakeRepo);

  beforeEach(() => {
    vitest.resetAllMocks();
  });

  it('should create user with hashed password', async () => {
    (hash as Mock).mockResolvedValue('hashed-password');

    const user = (await service.execute({
      email: 'user@example.com',
      name: 'User',
      password: 'plainpass',
    })) as User;

    expect(user).toHaveProperty('id');
    expect(hash).toHaveBeenCalledWith('plainpass', 8);
    expect(user.password).toBe('hashed-password');
  });

  it('should throw if user with email exists', async () => {
    await fakeRepo.create({
      email: 'dup@example.com',
      password: 'somepass',
      name: 'Dup User',
    });

    await expect(
      service.execute({
        email: 'dup@example.com',
        name: 'User',
        password: 'pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
