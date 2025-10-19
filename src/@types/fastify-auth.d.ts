import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
    tryAuthenticate: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  }
}
