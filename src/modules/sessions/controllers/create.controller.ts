import { CreateSessionDTO } from '../schema';
import { CreateSessionService } from '../services/create.service';

export function CreateSessionController() {
  return {
    async execute(data: CreateSessionDTO) {
      const service = CreateSessionService();
      return service.execute(data);
    },
  };
}
