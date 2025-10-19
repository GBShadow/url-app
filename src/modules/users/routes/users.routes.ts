import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';
import { CreateUserController } from '@/modules/users/controllers/create.controller';
import { ListUserController } from '@/modules/users/controllers/list.controller';
import { ShowUserController } from '@/modules/users/controllers/show.controller';
import { UpdateUserController } from '@/modules/users/controllers/update.controller';
import {
  createUserSchema,
  listUserSchema,
  paramUserSchema,
  updateUserSchema,
  userResponseSchema,
} from '@/modules/users/schema';
import { errorResponseSchema } from '@/shared/schema';
import { FastifyTypedInstance } from '@/shared/types';

export function userRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', app.authenticate);

  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['Users'],
        description: 'Show a user',
        params: paramUserSchema,
        response: {
          [StatusCodes.OK]: userResponseSchema,
          [StatusCodes.NOT_FOUND]: errorResponseSchema.default({
            code: 'not.found',
            message: 'User not found',
            statusCode: StatusCodes.NOT_FOUND,
            error: ReasonPhrases.NOT_FOUND,
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
      const params = request.params;
      const controller = ShowUserController();
      const user = await controller.execute(params);
      return reply.status(StatusCodes.OK).send(user);
    },
  );

  app.get(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'List users',
        querystring: listUserSchema,
        response: {
          [StatusCodes.OK]: z.object({
            items: z.array(userResponseSchema).default([]),
            pages: z.number(),
            totalItems: z.number(),
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
      const queries = request.query;
      const controller = ListUserController();
      const users = await controller.execute(queries);
      return reply.status(StatusCodes.OK).send(users);
    },
  );

  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'Create a new user',
        body: createUserSchema,
        response: {
          [StatusCodes.CREATED]: userResponseSchema,
          [StatusCodes.CONFLICT]: errorResponseSchema.default({
            code: 'duplicate.email',
            message: 'User already exist with same email',
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
      const controller = CreateUserController();
      const user = await controller.execute(body);
      return reply.status(StatusCodes.CREATED).send(user);
    },
  );

  app.put(
    '/users/:id',
    {
      schema: {
        tags: ['Users'],
        description: 'Update a user',
        body: updateUserSchema,
        params: paramUserSchema,
        response: {
          [StatusCodes.OK]: userResponseSchema,
          [StatusCodes.NOT_FOUND]: errorResponseSchema.default({
            code: 'not.found',
            message: 'User not found',
            statusCode: StatusCodes.NOT_FOUND,
            error: ReasonPhrases.NOT_FOUND,
          }),
          [StatusCodes.CONFLICT]: errorResponseSchema.default({
            code: 'duplicate.email',
            message: 'User already exist with same email',
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
      const params = request.params;
      const body = request.body;
      const controller = UpdateUserController();
      const user = await controller.execute(params.id, body);
      return reply.status(StatusCodes.OK).send(user);
    },
  );
}
