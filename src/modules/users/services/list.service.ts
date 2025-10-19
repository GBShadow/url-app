import { UserRepository } from '../repositories/user.repository';
import { ListUserDTO } from '../schema';

export function ListUserService() {
  const userRepository = UserRepository();

  return {
    async execute(data: ListUserDTO) {
      const users = await userRepository.findAll(data);

      return users;
    },
  };
}
