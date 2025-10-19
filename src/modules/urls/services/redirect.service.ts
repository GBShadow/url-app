import { StatusCodes } from 'http-status-codes';
import { UrlRepository } from '../repositories/url.repository';
import { AppError } from '@/errors/app-error';

export function RedirectUrlService() {
  const urlRepository = UrlRepository();

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
