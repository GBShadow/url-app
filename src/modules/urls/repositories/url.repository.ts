import {
  CreateUrlDTO,
  DeleteUrlDTO,
  ListUrlDTO,
  UpdateUrlDTO,
} from '../schema';
import { db } from '@/database/prisma';
import { env } from '@/env';
import { calcPages } from '@/functions/pages';
import { MAX_QUANTITY } from '@/shared/constants';

export function UrlRepository() {
  return {
    async findByParam(param: string) {
      return await db.url.findFirst({
        where: {
          generatedUrl: `${env.DOMAIN}/${param}`,
        },
      });
    },
    async findByBaseUrl({
      baseUrl,
      userId,
    }: {
      baseUrl: string;
      userId: string;
    }) {
      return db.url.findFirst({
        where: {
          baseUrl,
          userId,
          deletedAt: null,
        },
      });
    },
    async findById({ id, userId }: { id: string; userId: string }) {
      return db.url.findFirst({
        where: {
          id,
          userId,
          deletedAt: null,
        },
      });
    },
    async findAll(data: ListUrlDTO & { userId: string }) {
      const [totalItems, items] = await db.$transaction([
        db.url.count({
          where: {
            userId: data.userId,
            deletedAt: null,
          },
        }),
        db.url.findMany({
          where: {
            userId: data.userId,
            deletedAt: null,
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
    async create(
      data: CreateUrlDTO & { generatedUrl: string; userId?: string },
    ) {
      return db.url.create({
        data: {
          baseUrl: data.baseUrl,
          generatedUrl: data.generatedUrl,
          userId: data.userId,
        },
      });
    },
    async update(id: string, data: UpdateUrlDTO & { generatedUrl: string }) {
      return db.url.update({
        where: {
          id,
        },
        data: {
          baseUrl: data.baseUrl,
          generatedUrl: data.generatedUrl,
        },
      });
    },
    async updateClick(id: string, data: { clicks: number }) {
      return db.url.update({
        where: {
          id,
        },
        data,
      });
    },

    async delete(data: DeleteUrlDTO) {
      return db.url.update({
        where: {
          id: data.id,
          userId: data.userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    },
  };
}
