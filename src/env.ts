import z from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url().nonempty(),
  PORT: z.coerce.number().positive().optional().default(3000),
  JWT_PRIVATE_KEY: z.string().nonempty(),
  JWT_PUBLIC_KEY: z.string().nonempty(),
  DOMAIN: z
    .url()
    .nonempty()
    .transform((v) => {
      if (v.endsWith('/')) {
        console.log('Lembre de não colocar a barra no final');
        return v.replace(/\/+$/, '');
      }
      return v;
    }),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
