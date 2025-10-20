import { StatusCodes } from 'http-status-codes';
import { ShowUserDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUserRepository } from '../interfaces/user-repository';

export function ShowUserService(userRepository: IUserRepository) {
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
