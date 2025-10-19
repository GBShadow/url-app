import { JwtPayload } from "@/shared/types";
import { FastifyRequest } from "fastify";
import cryptoRandomString from "crypto-random-string";

export const convertBuffer = (value: string) => {
  return Buffer.from(value, "base64").toString();
};

export const currentUser = (req: FastifyRequest) => {
  return req.user as JwtPayload;
};

export const randomString = () =>
  cryptoRandomString({ length: 6, type: "alphanumeric" });
