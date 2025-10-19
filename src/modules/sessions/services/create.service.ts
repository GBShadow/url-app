import { AppError } from "@/errors/app-error";
import { CreateSessionDTO } from "../schema";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "@/modules/users/repositories/user.repository";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { convertBuffer } from "@/functions/utils";

export function CreateSessionService() {
  const userRepository = UserRepository();

  return {
    async execute(data: CreateSessionDTO) {
      const user = await userRepository.findByEmail(data.email, {
        omit: false,
      });

      if (!user) {
        throw new AppError({
          message: "Email/Password invalid",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }
      const passwordValid = await compare(data.password, user.password);

      if (!passwordValid) {
        throw new AppError({
          message: "Email/Password invalid",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email },
        convertBuffer(env.JWT_PRIVATE_KEY),
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );

      return { token };
    },
  };
}
