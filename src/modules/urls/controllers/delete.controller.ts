import { UrlRepository } from '../repositories/url.repository';
import { DeleteUrlDTO } from '../schema';
import { DeleteUrlService } from '../services/delete.service';

export function DeleteUrlController() {
  const urlRepository = UrlRepository();
  const service = DeleteUrlService(urlRepository);
  return {
    async execute(data: DeleteUrlDTO) {
      return service.execute(data);
    },
  };
}
