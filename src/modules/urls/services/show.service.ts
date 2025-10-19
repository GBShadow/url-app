import { AppError } from "@/errors/app-error";
import { ShowUrlDTO } from "../schema";
import { UrlRepository } from "../repositories/url.repository";
import { StatusCodes } from "http-status-codes";

export function ShowUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(data: ShowUrlDTO & { userId: string }) {
      const url = await urlRepository.findById(data);

      if (!url) {
        throw new AppError({
          code: "not.found",
          message: "Url not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return url;
    },
  };
}
