import { randomUUID } from 'crypto';
import { calcPages } from '@/functions/pages';
import { ListUserDTO } from '@/modules/users/schema';
import { MAX_QUANTITY } from '@/shared/constants';
import { IUserRepository } from '@/modules/users/interfaces/user-repository';
import { CreateUserDTO, UpdateUserDTO } from '@/modules/users/schema';
import { User } from '@prisma/client';

export function FakeUserRepository(): IUserRepository {
  const users: User[] = [];

  return {
    async findByEmail(email: string) {
      return users.find((u) => u.email === email) ?? null;
    },

    async findById(id: string) {
      return users.find((u) => u.id === id) ?? null;
    },

    async create(data: CreateUserDTO): Promise<Omit<User, 'password'>> {
      const newUser = {
        id: randomUUID(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        urls: [],
      };
      users.push(newUser);
      return newUser;
    },

    async update(
      id: string,
      data: UpdateUserDTO,
    ): Promise<Omit<User, 'password'>> {
      const index = users.findIndex((u) => u.id === id);

      users[index] = {
        ...users[index],
        ...data,
        updatedAt: new Date(),
      };
      return users[index];
    },

    async findAll(input: ListUserDTO) {
      const { page, orderBy } = input;

      const sorted = [...users].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
      });

      const start = (page - 1) * MAX_QUANTITY;
      const items = sorted.slice(start, start + MAX_QUANTITY);
      const totalItems = sorted.length;

      return {
        items,
        totalItems,
        pages: calcPages({ totalItems }),
      };
    },
  };
}
