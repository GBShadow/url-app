import { FastifyReply, FastifyRequest } from 'fastify';
import { sessionRoutes } from './modules/sessions/routes/session.routes';
import { urlRoutes } from './modules/urls/routes/urls.routes';
import { userRoutes } from './modules/users/routes/users.routes';
import { FastifyTypedInstance } from './shared/types';
import { StatusCodes } from 'http-status-codes';

export function routes(app: FastifyTypedInstance) {
  app.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
    return reply.status(StatusCodes.OK).send();
  });
  app.register(sessionRoutes);
  app.register(userRoutes);
  app.register(urlRoutes);
}
