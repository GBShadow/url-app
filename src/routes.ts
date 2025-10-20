import { FastifyReply, FastifyRequest } from 'fastify';
import { sessionRoutes } from './modules/sessions/routes/session.routes';
import { urlRoutes } from './modules/urls/routes/urls.routes';
import { userRoutes } from './modules/users/routes/users.routes';
import { FastifyTypedInstance } from './shared/types';
import { StatusCodes } from 'http-status-codes';

export function routes(app: FastifyTypedInstance) {
  app.register(sessionRoutes);
  app.register(userRoutes);
  app.register(urlRoutes);
  app.get('/hello', async () => {
    return { message: 'Hello from Supertest' };
  });
  app.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
    return reply.status(StatusCodes.NO_CONTENT).send();
  });
}
