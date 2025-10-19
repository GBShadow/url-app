import { ListUserDTO } from '../schema';
import { ListUserService } from '../services/list.service';

export function ListUserController() {
  return {
    async execute(data: ListUserDTO) {
      const service = ListUserService();
      return service.execute(data);
    },
  };
}
