import { IUrlRepository } from '../interfaces/url-repository';
import { ListUrlDTO } from '../schema';

export function ListUrlService(urlRepository: IUrlRepository) {
  return {
    async execute(
      data: ListUrlDTO & {
        userId: string;
      },
    ) {
      const urls = await urlRepository.findAll(data);

      return urls;
    },
  };
}
