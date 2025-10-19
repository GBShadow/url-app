import { StatusCodes, getReasonPhrase } from "http-status-codes";

type AppErrorDto = {
  statusCode?: number;
  message: string;
  code?: string;
};

export class AppError extends Error {
  statusCode: number;
  message: string;
  code: string;
  error: string;

  constructor({ statusCode, message, code }: AppErrorDto) {
    super();
    this.message = message;
    this.code = code ?? "blank";
    this.statusCode = statusCode ?? StatusCodes.BAD_REQUEST;
    this.error = getReasonPhrase(statusCode || StatusCodes.BAD_REQUEST);
  }
}
