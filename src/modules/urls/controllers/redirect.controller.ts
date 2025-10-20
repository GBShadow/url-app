import { UrlRepository } from '../repositories/url.repository';
import { RedirectUrlService } from '../services/redirect.service';

export function RedirectUrlController() {
  const urlRepository = UrlRepository();
  const service = RedirectUrlService(urlRepository);
  return {
    async execute(param: string) {
      return service.execute(param);
    },
  };
}
