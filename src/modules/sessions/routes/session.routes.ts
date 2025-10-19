import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CreateSessionController } from '@/modules/sessions/controllers/create.controller';
import {
  createSessionSchema,
  sessionResponseSchema,
} from '@/modules/sessions/schema';
import { errorResponseSchema } from '@/shared/schema';
import { FastifyTypedInstance } from '@/shared/types';

export function sessionRoutes(app: FastifyTypedInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: ['Session'],
        description: 'Create a session',
        body: createSessionSchema,
        response: {
          [StatusCodes.CREATED]: sessionResponseSchema,
          [StatusCodes.UNAUTHORIZED]: errorResponseSchema.default({
            code: 'blank',
            message: 'Email/Password invalid',
            statusCode: StatusCodes.CONFLICT,
            error: ReasonPhrases.CONFLICT,
          }),
          [StatusCodes.BAD_REQUEST]: errorResponseSchema.default({
            code: 'string',
            message: 'string',
            statusCode: StatusCodes.BAD_REQUEST,
            error: ReasonPhrases.BAD_REQUEST,
          }),
        },
      },
    },
    async (request, reply) => {
      const body = request.body;
      const controller = CreateSessionController();
      const session = await controller.execute(body);
      return reply.status(StatusCodes.CREATED).send(session);
    },
  );
}
