import z from 'zod';

export const createUrlSchema = z.object({
  baseUrl: z
    .string()
    .nonempty()
    .transform((url) => {
      const regexHttp = /^https?:\/\//;

      return !regexHttp.test(url) ? `https://${url}` : url;
    })
    .pipe(z.url()),
});

export const updateUrlSchema = z.object({
  baseUrl: z.string().nonempty(),
});

export const paramUrlSchema = z.object({
  id: z.uuid(),
});

export const deleteUrlSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
});

export const listUrlSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => v && Number(v))
    .default(1)
    .pipe(z.number()),
  orderBy: z
    .enum(['id', 'baseUrl', 'createdAt'])
    .optional()
    .default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const urlResponseSchema = z.object({
  id: z.string(),
  baseUrl: z.string(),
  generatedUrl: z.string(),
  userId: z.string().nullable(),
  clicks: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type CreateUrlDTO = z.infer<typeof createUrlSchema>;
export type UpdateUrlDTO = z.infer<typeof updateUrlSchema>;
export type ShowUrlDTO = z.infer<typeof paramUrlSchema>;
export type ListUrlDTO = z.infer<typeof listUrlSchema>;
export type DeleteUrlDTO = z.infer<typeof deleteUrlSchema>;
