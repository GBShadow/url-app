import { ListUserDTO } from "../schema";
import { UserRepository } from "../repositories/user.repository";

export function ListUserService() {
  const userRepository = UserRepository();

  return {
    async execute(data: ListUserDTO) {
      const users = await userRepository.findAll(data);

      return users;
    },
  };
}
