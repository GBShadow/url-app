import { StatusCodes } from 'http-status-codes';
import { ShowUrlDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUrlRepository } from '../interfaces/url-repository';

export function ShowUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(data: ShowUrlDTO & { userId: string }) {
      const url = await urlRepository.findById(data);

      if (!url) {
        throw new AppError({
          code: 'not.found',
          message: 'Url not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return url;
    },
  };
}
