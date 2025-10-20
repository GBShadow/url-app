import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { CreateSessionDTO } from '../schema';
import { env } from '@/env';
import { AppError } from '@/errors/app-error';
import { convertBuffer } from '@/functions/utils';
import { IUserRepository } from '@/modules/users/interfaces/user-repository';

export function CreateSessionService(userRepository: IUserRepository) {
  return {
    async execute(data: CreateSessionDTO) {
      const user = await userRepository.findByEmail(data.email, {
        omit: false,
      });

      if (!user) {
        throw new AppError({
          message: 'Email/Password invalid',
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }
      const passwordValid = await compare(data.password, user.password);

      if (!passwordValid) {
        throw new AppError({
          message: 'Email/Password invalid',
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email },
        convertBuffer(env.JWT_PRIVATE_KEY),
        {
          algorithm: 'RS256',
          expiresIn: '1h',
        },
      );

      return { token };
    },
  };
}
