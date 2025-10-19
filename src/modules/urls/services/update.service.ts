import { AppError } from "@/errors/app-error";
import { CreateUrlDTO } from "../schema";
import { UrlRepository } from "../repositories/url.repository";
import { StatusCodes } from "http-status-codes";
import { env } from "@/env";
import { randomString } from "@/functions/utils";

export function UpdateUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(id: string, data: CreateUrlDTO & { userId: string }) {
      const url = await urlRepository.findById(id);

      if (!url) {
        throw new AppError({
          code: "not.found",
          message: "Url not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (url.baseUrl !== data.baseUrl) {
        const urlWithSameEmail = await urlRepository.findByBaseUrl(data);
        if (urlWithSameEmail) {
          throw new AppError({
            code: "duplicate.url",
            message: "Url already exist",
            statusCode: StatusCodes.CONFLICT,
          });
        }
      }

      const generatedUrl = `${env.DOMAIN}/${randomString()}`;

      return urlRepository.update(id, { ...data, generatedUrl });
    },
  };
}
