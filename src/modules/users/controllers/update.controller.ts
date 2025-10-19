import { UpdateUserDTO } from "../schema";
import { UpdateUserService } from "../services/update.service";

export function UpdateUserController() {
  return {
    async execute(id: string, data: UpdateUserDTO) {
      const service = UpdateUserService();
      return service.execute(id, data);
    },
  };
}
