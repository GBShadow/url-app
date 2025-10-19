import { RedirectUrlService } from '../services/redirect.service';

export function RedirectUrlController() {
  return {
    async execute(param: string) {
      const service = RedirectUrlService();
      return service.execute(param);
    },
  };
}
