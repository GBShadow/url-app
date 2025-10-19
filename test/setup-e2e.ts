import 'dotenv/config';

import { envSchema } from '../src/env';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { FastifyTypedInstance } from '@/shared/types';
import { buildApp } from '@/server';

const prisma = new PrismaClient();
let app: FastifyTypedInstance;

const env = envSchema.parse(process.env);

const schemaId = randomUUID().replace(/-/g, '_');

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.');
  }

  const url = new URL(env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId);

  process.env.DATABASE_URL = databaseUrl;

  app = buildApp();
  execSync('npx prisma migrate deploy');
  await app.listen({ port: 3333 });
});

afterAll(async () => {
  await app.close();
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});

export { app };
