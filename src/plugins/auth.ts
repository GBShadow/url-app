import { FastifyTypedInstance, JwtPayload } from "@/shared/types";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async (app: FastifyTypedInstance) => {
  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        req.user = await req.jwtVerify<JwtPayload>();
      } catch (err) {
        reply.status(401).send(err);
      }
    }
  );

  app.decorate("tryAuthenticate", async (req: FastifyRequest) => {
    try {
      req.user = await req.jwtVerify<JwtPayload>();
    } catch {
      req.user = null as any;
    }
  });
});
