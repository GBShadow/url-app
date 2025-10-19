import z from "zod";

export const createSessionSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export const sessionResponseSchema = z.object({
  token: z.jwt(),
});

export type CreateSessionDTO = z.infer<typeof createSessionSchema>;
