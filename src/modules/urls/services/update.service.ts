import { StatusCodes } from 'http-status-codes';
import { CreateUrlDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUrlRepository } from '../interfaces/url-repository';
import { generatedUrlHelper } from '../utils';

export function UpdateUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(id: string, data: CreateUrlDTO & { userId: string }) {
      const url = await urlRepository.findById({ id, userId: data.userId });

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

      const generatedUrl = await generatedUrlHelper(data.userId, urlRepository);

      return urlRepository.update(id, { ...data, generatedUrl });
    },
  };
}
