// src/repositories/contracts/url-repository.ts

import {
  CreateUrlDTO,
  DeleteUrlDTO,
  ListUrlDTO,
  UpdateUrlDTO,
} from '@/modules/urls/schema';
import { Url } from '@prisma/client';

export interface IUrlRepository {
  findByParam(param: string): Promise<Url | null>;

  findByBaseUrl(params: {
    baseUrl: string;
    userId: string;
  }): Promise<Url | null>;

  findById(params: { id: string; userId: string }): Promise<Url | null>;

  findAll(data: ListUrlDTO & { userId: string }): Promise<{
    items: Url[];
    totalItems: number;
    pages: number;
  }>;

  create(
    data: CreateUrlDTO & { generatedUrl: string; userId?: string },
  ): Promise<Url | { generatedUrl: string }>;

  update(
    id: string,
    data: UpdateUrlDTO & { generatedUrl: string },
  ): Promise<Url>;

  updateClick(id: string, data: { clicks: number }): Promise<Url>;

  delete(data: DeleteUrlDTO): Promise<void>;
}
