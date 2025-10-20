import { compare, hash } from 'bcryptjs';
import { AppError } from '@/errors/app-error';
import { Mock } from 'vitest';
import { UpdateUserService } from './update.service';
import { FakeUserRepository } from '../../../../test/repositories/fake-user.repositoy';
import { User } from '@prisma/client';

vitest.mock('bcryptjs');

describe('UpdateUserService', () => {
  const fakeRepo = FakeUserRepository();
  const service = UpdateUserService(fakeRepo);

  beforeEach(() => {
    vitest.resetAllMocks();
  });

  it('should update user data and re-hash password if changed', async () => {
    const created = await fakeRepo.create({
      email: 'update@example.com',
      name: 'Update User',
      password: 'hashedpass',
    });

    (compare as Mock).mockResolvedValue(false);
    (hash as Mock).mockResolvedValue('newhashedpass');

    const updated = (await service.execute(created.id, {
      email: 'update@example.com',
      name: 'Updated Name',
      password: 'newpass',
    })) as User;

    expect(updated.name).toBe('Updated Name');
    expect(hash).toHaveBeenCalledWith('newpass', 8);
    expect(updated.password).toBe('newhashedpass');
  });

  it('should not re-hash password if password is the same', async () => {
    const created = await fakeRepo.create({
      email: 'update2@example.com',
      name: 'Update User 2',
      password: 'hashedpass',
    });

    (compare as Mock).mockResolvedValue(true);

    const updated = await service.execute(created.id, {
      email: 'update2@example.com',
      name: 'Updated Name 2',
      password: 'samepass',
    });

    expect(hash).not.toHaveBeenCalled();
    expect(updated.name).toBe('Updated Name 2');
  });

  it('should throw if user not found', async () => {
    await expect(
      service.execute('invalid-id', {
        email: 'notfound@example.com',
        name: 'Not Found',
        password: 'pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw if new email already exists in another user', async () => {
    await fakeRepo.create({
      email: 'existing@example.com',
      name: 'Existing',
      password: 'pass',
    });

    const userToUpdate = await fakeRepo.create({
      email: 'user@example.com',
      name: 'User',
      password: 'pass',
    });

    (compare as Mock).mockResolvedValue(true);

    await expect(
      service.execute(userToUpdate.id, {
        email: 'existing@example.com',
        name: 'User',
        password: 'pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
