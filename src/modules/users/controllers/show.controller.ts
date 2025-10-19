import { ShowUserDTO } from '../schema';
import { ShowUserService } from '../services/show.service';

export function ShowUserController() {
  return {
    async execute(data: ShowUserDTO) {
      const service = ShowUserService();

      return service.execute(data);
    },
  };
}
