import { AppError } from "@/errors/app-error";
import { UrlRepository } from "../repositories/url.repository";
import { DeleteUrlDTO } from "../schema";
import { StatusCodes } from "http-status-codes";

export function DeleteUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(data: DeleteUrlDTO) {
      const url = await urlRepository.findById(data);
      if (!url) {
        throw new AppError({
          code: "not.found",
          message: "Url not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      await urlRepository.delete(data);
    },
  };
}
