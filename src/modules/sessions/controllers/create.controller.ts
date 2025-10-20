import { UserRepository } from '@/modules/users/repositories/user.repository';
import { CreateSessionDTO } from '../schema';
import { CreateSessionService } from '../services/create.service';

export function CreateSessionController() {
  const userRepository = UserRepository();
  const service = CreateSessionService(userRepository);
  return {
    async execute(data: CreateSessionDTO) {
      return service.execute(data);
    },
  };
}
