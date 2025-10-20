import { randomUUID } from 'crypto';
import { calcPages } from '@/functions/pages';
import { IUrlRepository } from '@/modules/urls/interfaces/url-repository';
import { Url } from '@prisma/client';
import {
  CreateUrlDTO,
  UpdateUrlDTO,
  DeleteUrlDTO,
  ListUrlDTO,
} from '@/modules/urls/schema';
const PAGE_SIZE = 10;

export function FakeUrlRepository(): IUrlRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const urls: any[] = [];
  return {
    async findByParam(param: string) {
      return (
        urls.find((u) => u.generatedUrl === `https://short.ly/${param}`) ?? null
      );
    },

    async findByBaseUrl({
      baseUrl,
      userId,
    }: {
      baseUrl: string;
      userId: string;
    }) {
      return (
        urls.find((u) => u.baseUrl === baseUrl && userId === u.userId) ?? null
      );
    },

    async findById({ id, userId }: { id: string; userId: string }) {
      return urls.find((u) => u.id === id && userId === u.userId) ?? null;
    },

    async create(
      data: CreateUrlDTO & { generatedUrl: string; userId?: string },
    ): Promise<Url | { generatedUrl: string }> {
      if (data.userId) {
        const newUrl = {
          id: randomUUID(),
          ...data,
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        urls.push(newUrl);
        return newUrl;
      }

      return {
        generatedUrl: data.generatedUrl,
      };
    },

    async update(
      id: string,
      data: UpdateUrlDTO & { generatedUrl: string },
    ): Promise<Url> {
      const index = urls.findIndex((u) => u.id === id);

      urls[index] = {
        ...urls[index],
        ...data,
        updatedAt: new Date(),
      };
      return urls[index];
    },

    async updateClick(id: string) {
      const url = urls.find((u) => u.id === id) ?? null;
      if (!url) return null;
      url.clicks += 1;
      url.updatedAt = new Date();
      return url;
    },

    async delete({ id, userId }: DeleteUrlDTO) {
      const index = urls.findIndex((u) => u.id === id && userId === u.userId);

      urls[index].deletedAt = new Date();
    },

    async findAll(input: ListUrlDTO & { userId: string }) {
      const { page, orderBy, order } = input;

      const sorted = [...urls].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
      });

      const start = (page - 1) * PAGE_SIZE;
      const items = sorted.slice(start, start + PAGE_SIZE);
      const totalItems = sorted.length;

      return {
        items,
        totalItems,
        pages: calcPages({ totalItems }),
      };
    },
  };
}
