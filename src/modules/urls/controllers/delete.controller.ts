import { DeleteUrlDTO } from "../schema";
import { DeleteUrlService } from "../services/delete.service";

export function DeleteUrlController() {
  return {
    async execute(data: DeleteUrlDTO) {
      const service = DeleteUrlService();
      return service.execute(data);
    },
  };
}
