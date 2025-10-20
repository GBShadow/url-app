import { UserRepository } from '../repositories/user.repository';
import { ShowUserDTO } from '../schema';
import { ShowUserService } from '../services/show.service';

export function ShowUserController() {
  const userRepository = UserRepository();
  const service = ShowUserService(userRepository);
  return {
    async execute(data: ShowUserDTO) {
      return service.execute(data);
    },
  };
}
