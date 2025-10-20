import { UserRepository } from '../repositories/user.repository';
import { ListUserDTO } from '../schema';
import { ListUserService } from '../services/list.service';

export function ListUserController() {
  const userRepository = UserRepository();
  const service = ListUserService(userRepository);
  return {
    async execute(data: ListUserDTO) {
      return service.execute(data);
    },
  };
}
