import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/user.repository';
import { ShowUserDTO } from '../schema';
import { AppError } from '@/errors/app-error';

export function ShowUserService() {
  const userRepository = UserRepository();

  return {
    async execute(data: ShowUserDTO) {
      const user = await userRepository.findById(data.id);

      if (!user) {
        throw new AppError({
          code: 'not.found',
          message: 'User not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return user;
    },
  };
}
