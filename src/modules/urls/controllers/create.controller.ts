import { CreateUrlDTO } from '../schema';
import { CreateUrlService } from '../services/create.service';

export function CreateUrlController() {
  return {
    async execute(data: CreateUrlDTO & { userId: string }) {
      const service = CreateUrlService();
      return service.execute(data);
    },
  };
}
