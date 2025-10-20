import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/errors/app-error';
import { IUrlRepository } from '../interfaces/url-repository';

export function RedirectUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(param: string) {
      const url = await urlRepository.findByParam(param);

      if (!url) {
        throw new AppError({
          code: 'not.found',
          message: 'Url not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      await urlRepository.updateClick(url.id, { clicks: url.clicks + 1 });

      return url.baseUrl;
    },
  };
}
