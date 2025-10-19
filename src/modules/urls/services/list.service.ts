import { UrlRepository } from '../repositories/url.repository';
import { ListUrlDTO } from '../schema';

export function ListUrlService() {
  const urlRepository = UrlRepository();

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
