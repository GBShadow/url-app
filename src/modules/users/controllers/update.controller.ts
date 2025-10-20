import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDTO } from '../schema';
import { UpdateUserService } from '../services/update.service';

export function UpdateUserController() {
  const userRepository = UserRepository();
  const service = UpdateUserService(userRepository);
  return {
    async execute(id: string, data: UpdateUserDTO) {
      return service.execute(id, data);
    },
  };
}
