import { UrlRepository } from '../repositories/url.repository';
import { ListUrlDTO } from '../schema';
import { ListUrlService } from '../services/list.service';

export function ListUrlController() {
  const urlRepository = UrlRepository();
  const service = ListUrlService(urlRepository);
  return {
    async execute(data: ListUrlDTO & { userId: string }) {
      return service.execute(data);
    },
  };
}
