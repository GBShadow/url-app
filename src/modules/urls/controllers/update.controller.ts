import { UrlRepository } from '../repositories/url.repository';
import { UpdateUrlDTO } from '../schema';
import { UpdateUrlService } from '../services/update.service';

export function UpdateUrlController() {
  const urlRepository = UrlRepository();
  const service = UpdateUrlService(urlRepository);
  return {
    async execute(id: string, data: UpdateUrlDTO & { userId: string }) {
      return service.execute(id, data);
    },
  };
}
