import { CreateUserDTO } from '../schema';
import { CreateUserService } from '../services/create.service';

export function CreateUserController() {
  return {
    async execute(data: CreateUserDTO) {
      const service = CreateUserService();
      return service.execute(data);
    },
  };
}
