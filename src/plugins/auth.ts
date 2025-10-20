import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyTypedInstance, JwtPayload } from '@/shared/types';

export default fp(async (app: FastifyTypedInstance) => {
  app.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        req.user = await req.jwtVerify<JwtPayload>();
      } catch (err) {
        reply.status(401).send(err);
      }
    },
  );

  app.decorate('tryAuthenticate', async (req: FastifyRequest) => {
    try {
      req.user = await req.jwtVerify<JwtPayload>();
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.user = null as any;
    }
  });
});
