import { UrlRepository } from '../repositories/url.repository';
import { ShowUrlDTO } from '../schema';
import { ShowUrlService } from '../services/show.service';

export function ShowUrlController() {
  const urlRepository = UrlRepository();
  const service = ShowUrlService(urlRepository);
  return {
    async execute(data: ShowUrlDTO & { userId: string }) {
      return service.execute(data);
    },
  };
}
