import { CreateUserDTO, ListUserDTO, UpdateUserDTO } from '../schema';
import { db } from '@/database/prisma';
import { calcPages } from '@/functions/pages';
import { MAX_QUANTITY } from '@/shared/constants';

export function UserRepository() {
  return {
    async findByEmail(email: string, { omit } = { omit: true }) {
      return db.user.findFirst({
        where: {
          email,
          deletedAt: null,
        },
        ...(omit && {
          omit: {
            password: true,
          },
        }),
      });
    },
    async findById(id: string, { omit } = { omit: true }) {
      return db.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
        ...(omit && {
          omit: {
            password: true,
          },
        }),
      });
    },
    async findAll(data: ListUserDTO) {
      const [totalItems, items] = await db.$transaction([
        db.user.count({
          where: {
            deletedAt: null,
          },
        }),
        db.user.findMany({
          where: {
            deletedAt: null,
          },
          omit: {
            password: true,
          },
          take: MAX_QUANTITY,
          skip: (data.page - 1) * MAX_QUANTITY,
          orderBy: {
            [data.orderBy]: data.order,
          },
        }),
      ]);
      return {
        items,
        totalItems,
        pages: calcPages({ totalItems }),
      };
    },
    async create(data: CreateUserDTO) {
      return db.user.create({
        data,
        omit: {
          password: true,
        },
      });
    },
    async update(id: string, data: UpdateUserDTO) {
      return db.user.update({
        where: {
          id,
        },
        data,
        omit: {
          password: true,
        },
      });
    },
  };
}
