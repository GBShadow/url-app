import { AppError } from "@/errors/app-error";
import { CreateUrlDTO } from "../schema";
import { StatusCodes } from "http-status-codes";
import { UrlRepository } from "../repositories/url.repository";
import { env } from "@/env";
import { randomString } from "@/functions/utils";

export function CreateUrlService() {
  const urlRepository = UrlRepository();

  return {
    async execute(data: CreateUrlDTO & { userId?: string }) {
      if (!data.userId) {
        const generatedUrl = `${env.DOMAIN}/${randomString()}`;

        await urlRepository.create({
          baseUrl: data.baseUrl,
          generatedUrl,
        });
        return { generatedUrl };
      }

      const url = await urlRepository.findByBaseUrl({
        baseUrl: data.baseUrl,
        userId: data.userId!,
      });
      if (url) {
        throw new AppError({
          code: "duplicate.url",
          message: "Url already exist",
          statusCode: StatusCodes.CONFLICT,
        });
      }

      const generatedUrl = `${env.DOMAIN}/${randomString()}`;

      return urlRepository.create({
        baseUrl: data.baseUrl,
        userId: data.userId!,
        generatedUrl,
      });
    },
  };
}
