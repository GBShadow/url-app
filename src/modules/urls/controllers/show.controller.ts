import { ShowUrlDTO } from "../schema";
import { ShowUrlService } from "../services/show.service";

export function ShowUrlController() {
  return {
    async execute(data: ShowUrlDTO & { userId: string }) {
      const service = ShowUrlService();

      return service.execute(data);
    },
  };
}
