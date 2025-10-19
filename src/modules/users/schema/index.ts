import z from "zod";

export const createUserSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  email: z.email().nonempty(),
});

export const updateUserSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  email: z.email().nonempty(),
});

export const paramUserSchema = z.object({
  id: z.uuid(),
});

export const listUserSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => v && Number(v))
    .default(1)
    .pipe(z.number()),
  orderBy: z.enum(["id", "name", "createdAt"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type ShowUserDTO = z.infer<typeof paramUserSchema>;
export type ListUserDTO = z.infer<typeof listUserSchema>;
