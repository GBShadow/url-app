import { StatusCodes } from 'http-status-codes';
import { UrlRepository } from '../repositories/url.repository';
import { CreateUrlDTO } from '../schema';
import { env } from '@/env';
import { AppError } from '@/errors/app-error';
import { randomString } from '@/functions/utils';

export function CreateUrlService() {
  const urlRepository = UrlRepository();

  async function generatedUrlHelper(userId?: string) {
    const param = randomString();
    if (!userId) {
      return `${env.DOMAIN}/${param}`;
    }
    const foundURL = await urlRepository.findByParam(param);

    if (foundURL) {
      generatedUrlHelper(userId);
    }

    return `${env.DOMAIN}/${param}`;
  }

  return {
    async execute(data: CreateUrlDTO & { userId?: string }) {
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

      const generatedUrl = await generatedUrlHelper();

      return urlRepository.create({
        baseUrl: data.baseUrl,
        userId: data.userId!,
        generatedUrl,
      });
    },
  };
}
