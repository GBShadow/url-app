import { ListUrlDTO } from "../schema";
import { ListUrlService } from "../services/list.service";

export function ListUrlController() {
  return {
    async execute(data: ListUrlDTO & { userId: string }) {
      const service = ListUrlService();
      return service.execute(data);
    },
  };
}
