import { fastifyCors } from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import chalk from 'chalk';
import log from 'consola';
import { fastify } from 'fastify';
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { errorHandler } from './functions/error';
import { convertBuffer } from './functions/utils';
import fastifyPluginAuth from './plugins/auth';
import { routes } from './routes';
import { JwtPayload } from './shared/types';

export function buildApp() {
  const app = fastify();
  app.setErrorHandler(errorHandler);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.register(fastifyJwt, {
    secret: {
      public: convertBuffer(env.JWT_PUBLIC_KEY),
      private: convertBuffer(env.JWT_PRIVATE_KEY),
    },
    sign: { algorithm: 'RS256' },
    formatUser: function (u) {
      return u as JwtPayload;
    },
  });
  app.register(fastifyCors, { origin: '*' });
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Encurtador de Links API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
  app.register(fastifyPluginAuth);
  app.register(routes);

  app.addHook('onError', ({ method, url }, _, error, done) => {
    log.error(`${chalk.yellow(method)} ${chalk.blue(url)}`, { error });
    done();
  });

  return app;
}

const server = async () => {
  const app = buildApp();

  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    log.success(chalk.green(`Server listening on port ${env.PORT}`));
  } catch (err) {
    log.error(chalk.red(err));
    app.log.error(err);
    process.exit(1);
  }
};

server();
