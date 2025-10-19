import { StatusCodes } from 'http-status-codes';
import { UrlRepository } from '../repositories/url.repository';
import { CreateUrlDTO } from '../schema';
import { env } from '@/env';
import { AppError } from '@/errors/app-error';
import { randomString } from '@/functions/utils';

export function UpdateUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(id: string, data: CreateUrlDTO & { userId: string }) {
      const url = await urlRepository.findById(id);

      if (!url) {
        throw new AppError({
          code: 'not.found',
          message: 'Url not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (url.baseUrl !== data.baseUrl) {
        const urlWithSameEmail = await urlRepository.findByBaseUrl(data);
        if (urlWithSameEmail) {
          throw new AppError({
            code: 'duplicate.url',
            message: 'Url already exist',
            statusCode: StatusCodes.CONFLICT,
          });
        }
      }

      const generatedUrl = `${env.DOMAIN}/${randomString()}`;

      return urlRepository.update(id, { ...data, generatedUrl });
    },
  };
}
