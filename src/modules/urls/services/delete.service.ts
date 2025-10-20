import { StatusCodes } from 'http-status-codes';
import { DeleteUrlDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUrlRepository } from '../interfaces/url-repository';

export function DeleteUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(data: DeleteUrlDTO) {
      const url = await urlRepository.findById(data);
      if (!url) {
        throw new AppError({
          code: 'not.found',
          message: 'Url not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      await urlRepository.delete(data);
    },
  };
}
