import {
  CreateUserDTO,
  ListUserDTO,
  UpdateUserDTO,
} from '@/modules/users/schema';
import { User } from '@prisma/client';

type UserWithPassword = User;
type UserWithoutPassword = Omit<User, 'password'>;

export interface IUserRepository {
  findByEmail(
    email: string,
    options?: { omit?: true },
  ): Promise<UserWithoutPassword | null>;

  findByEmail(
    email: string,
    options?: { omit?: false },
  ): Promise<UserWithPassword | null>;

  findById(
    id: string,
    options?: { omit?: true },
  ): Promise<UserWithoutPassword | null>;

  findById(
    id: string,
    options: { omit: false },
  ): Promise<UserWithPassword | null>;

  findAll(data: ListUserDTO): Promise<{
    items: Omit<User, 'password'>[];
    totalItems: number;
    pages: number;
  }>;

  create(data: CreateUserDTO): Promise<Omit<User, 'password'>>;

  update(id: string, data: UpdateUserDTO): Promise<Omit<User, 'password'>>;
}
