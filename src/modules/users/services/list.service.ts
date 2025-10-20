import { IUserRepository } from '../interfaces/user-repository';
import { ListUserDTO } from '../schema';

export function ListUserService(userRepository: IUserRepository) {
  return {
    async execute(data: ListUserDTO) {
      const users = await userRepository.findAll(data);

      return users;
    },
  };
}
