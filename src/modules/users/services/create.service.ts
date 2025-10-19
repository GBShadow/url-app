import { AppError } from "@/errors/app-error";
import { CreateUserDTO } from "../schema";
import { StatusCodes } from "http-status-codes";
import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";

export function CreateUserService() {
  const userRepository = UserRepository();

  return {
    async execute(data: CreateUserDTO) {
      const user = await userRepository.findByEmail(data.email);

      if (user) {
        throw new AppError({
          code: "duplicate.email",
          message: "User already exist with same email",
          statusCode: StatusCodes.CONFLICT,
        });
      }

      const passwordHashed = await hash(data.password, 8);
      return userRepository.create({ ...data, password: passwordHashed });
    },
  };
}
