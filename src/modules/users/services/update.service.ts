import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../schema';
import { AppError } from '@/errors/app-error';

export function UpdateUserService() {
  const userRepository = UserRepository();

  return {
    async execute(id: string, data: CreateUserDTO) {
      const user = await userRepository.findById(id, { omit: false });

      if (!user) {
        throw new AppError({
          code: 'not.found',
          message: 'User not found',
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (user.email !== data.email) {
        const userWithSameEmail = await userRepository.findByEmail(data.email);
        if (userWithSameEmail) {
          throw new AppError({
            code: 'duplicate.email',
            message: 'User already exist with same email',
            statusCode: StatusCodes.CONFLICT,
          });
        }
      }
      let passwordHashed = user.password;
      const passwordEqual = await compare(data.password, user.password);
      if (!passwordEqual) {
        passwordHashed = await hash(data.password, 8);
      }

      return userRepository.update(id, { ...data, password: passwordHashed });
    },
  };
}
