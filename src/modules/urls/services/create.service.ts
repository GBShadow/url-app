import { StatusCodes } from 'http-status-codes';
import { CreateUrlDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUrlRepository } from '../interfaces/url-repository';
import { generatedUrlHelper } from '../utils';
import { Url } from '@prisma/client';

export function CreateUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(
      data: CreateUrlDTO & { userId?: string },
    ): Promise<Url | { generatedUrl: string }> {
      if (!data.userId) {
        const generatedUrl = await generatedUrlHelper();

        await urlRepository.create({
          baseUrl: data.baseUrl,
          generatedUrl,
        });
        return { generatedUrl };
      }

      const url = await urlRepository.findByBaseUrl({
        baseUrl: data.baseUrl,
        userId: data.userId!,
      });

      if (url) {
        throw new AppError({
          code: 'duplicate.url',
          message: 'Url already exist',
          statusCode: StatusCodes.CONFLICT,
        });
      }

      const generatedUrl = await generatedUrlHelper(data.userId, urlRepository);

      return urlRepository.create({
        baseUrl: data.baseUrl,
        userId: data.userId!,
        generatedUrl,
      });
    },
  };
}
