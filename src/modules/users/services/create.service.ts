import { hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDTO } from '../schema';
import { AppError } from '@/errors/app-error';
import { IUserRepository } from '../interfaces/user-repository';

export function CreateUserService(userRepository: IUserRepository) {
  return {
    async execute(data: CreateUserDTO) {
      const user = await userRepository.findByEmail(data.email);

      if (user) {
        throw new AppError({
          code: 'duplicate.email',
          message: 'User already exist with same email',
          statusCode: StatusCodes.CONFLICT,
        });
      }

      const passwordHashed = await hash(data.password, 8);
      return userRepository.create({ ...data, password: passwordHashed });
    },
  };
}
