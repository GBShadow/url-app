import { AppError } from "@/errors/app-error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      code: error.code,
      error: error.error,
      message: error.message,
    });
  }

  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
}
