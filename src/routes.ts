import { sessionRoutes } from './modules/sessions/routes/session.routes';
import { urlRoutes } from './modules/urls/routes/urls.routes';
import { userRoutes } from './modules/users/routes/users.routes';
import { FastifyTypedInstance } from './shared/types';

export function routes(app: FastifyTypedInstance) {
  app.register(sessionRoutes);
  app.register(userRoutes);
  app.register(urlRoutes);
  app.get('/hello', async () => {
    return { message: 'Hello from Supertest' };
  });
}
