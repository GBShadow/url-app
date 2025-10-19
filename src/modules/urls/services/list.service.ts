import { ListUrlDTO } from "../schema";
import { UrlRepository } from "../repositories/url.repository";

export function ListUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(
      data: ListUrlDTO & {
        userId: string;
      }
    ) {
      const urls = await urlRepository.findAll(data);

      return urls;
    },
  };
}
