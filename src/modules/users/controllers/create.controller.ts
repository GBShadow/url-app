import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../schema';
import { CreateUserService } from '../services/create.service';

export function CreateUserController() {
  const userRepository = UserRepository();
  const service = CreateUserService(userRepository);
  return {
    async execute(data: CreateUserDTO) {
      return service.execute(data);
    },
  };
}
