import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '@/errors/app-error';
import { Mock } from 'vitest';
import { FakeUserRepository } from '../../../../test/repositories/fake-user.repositoy';
import { CreateSessionService } from './create.service';
import { User } from '@prisma/client';

vitest.mock('bcryptjs');
vitest.mock('jsonwebtoken');

describe('CreateSessionService', () => {
  const fakeRepo = FakeUserRepository();
  const service = CreateSessionService(fakeRepo);

  beforeEach(() => {
    vitest.resetAllMocks();
  });

  it('should create a token when credentials are valid', async () => {
    const user = (await fakeRepo.create({
      email: 'test@example.com',
      password: 'hashed-password',
      name: 'Test User',
    })) as User;

    (compare as Mock).mockResolvedValue(true);
    (jwt.sign as Mock).mockReturnValue('fake-token');

    const result = await service.execute({
      email: user.email,
      password: 'password123',
    });

    expect(compare).toHaveBeenCalledWith('password123', user.password);
    expect(result).toEqual({ token: 'fake-token' });
  });

  it('should throw if user not found', async () => {
    await expect(
      service.execute({ email: 'unknown@example.com', password: 'pass' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw if password is invalid', async () => {
    const user = await fakeRepo.create({
      email: 'test2@example.com',
      password: 'hashed-pass',
      name: 'User2',
    });

    (compare as Mock).mockResolvedValue(false);

    await expect(
      service.execute({ email: user.email, password: 'wrongpass' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
