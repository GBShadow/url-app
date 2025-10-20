import { UrlRepository } from '../repositories/url.repository';
import { CreateUrlDTO } from '../schema';
import { CreateUrlService } from '../services/create.service';

export function CreateUrlController() {
  const urlRepository = UrlRepository();
  const service = CreateUrlService(urlRepository);
  return {
    async execute(data: CreateUrlDTO & { userId: string }) {
      return service.execute(data);
    },
  };
}
