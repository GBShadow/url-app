import { UpdateUrlDTO } from '../schema';
import { UpdateUrlService } from '../services/update.service';

export function UpdateUrlController() {
  return {
    async execute(id: string, data: UpdateUrlDTO & { userId: string }) {
      const service = UpdateUrlService();
      return service.execute(id, data);
    },
  };
}
