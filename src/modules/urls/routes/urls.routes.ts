import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import z from 'zod';
import { DeleteUrlController } from '../controllers/delete.controller';
import { RedirectUrlController } from '../controllers/redirect.controller';
import { currentUser } from '@/functions/utils';
import { CreateUrlController } from '@/modules/urls/controllers/create.controller';
import { ListUrlController } from '@/modules/urls/controllers/list.controller';
import { ShowUrlController } from '@/modules/urls/controllers/show.controller';
import { UpdateUrlController } from '@/modules/urls/controllers/update.controller';
import {
  createUrlSchema,
  listUrlSchema,
  paramUrlSchema,
  updateUrlSchema,
  urlResponseSchema,
} from '@/modules/urls/schema';
import { errorResponseSchema } from '@/shared/schema';
import { FastifyTypedInstance } from '@/shared/types';

export function urlRoutes(app: FastifyTypedInstance) {
  app.get(
    '/:param',
    {
      schema: {
        tags: ['Urls'],
        description: 'Redirect to destination url',
        params: z.object({ param: z.string().nonempty() }),
      },
    },
    async (request, reply) => {
      const params = request.params;
      const controller = RedirectUrlController();
      const url = await controller.execute(params.param);
      return reply.redirect(url);
    },
  );
  app.post(
    '/urls',
    {
      schema: {
        tags: ['Urls'],
        description: 'Create a new url',
        body: createUrlSchema,
        response: {
          [StatusCodes.CREATED]: urlResponseSchema.extend({
            id: z.string().optional(),
            baseUrl: z.string().optional(),
            generatedUrl: z.string(),
            userId: z.string().nullable().optional(),
            clicks: z.number().optional(),
            createdAt: z.date().optional(),
            updatedAt: z.date().optional(),
            deletedAt: z.date().nullable().optional(),
          }),
          [StatusCodes.CONFLICT]: errorResponseSchema.default({
            code: 'duplicate.email',
            message: 'Url already exist',
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
      onRequest: [app.tryAuthenticate],
    },
    async (request, reply) => {
      const user = currentUser(request);
      const body = request.body;
      const controller = CreateUrlController();
      const url = await controller.execute({
        ...body,
        userId: user?.sub,
      });
      return reply.status(StatusCodes.CREATED).send(url);
    },
  );

  app.delete(
    '/urls/:id',
    {
      schema: {
        tags: ['Urls'],
        description: 'Delete a url',
        params: paramUrlSchema,
        response: {
          [StatusCodes.NO_CONTENT]: urlResponseSchema,
          [StatusCodes.NOT_FOUND]: errorResponseSchema.default({
            code: 'not.found',
            message: 'Url not found',
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const user = currentUser(request);
      const params = request.params;
      const controller = DeleteUrlController();
      await controller.execute({
        ...params,
        userId: user.sub,
      });
      return reply.status(StatusCodes.NO_CONTENT).send();
    },
  );

  app.get(
    '/urls/:id',
    {
      schema: {
        tags: ['Urls'],
        description: 'Show a url',
        params: paramUrlSchema,
        response: {
          [StatusCodes.OK]: urlResponseSchema,
          [StatusCodes.NOT_FOUND]: errorResponseSchema.default({
            code: 'not.found',
            message: 'Url not found',
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const user = currentUser(request);
      const params = request.params;
      const controller = ShowUrlController();
      const url = await controller.execute({
        ...params,
        userId: user.sub,
      });
      return reply.status(StatusCodes.OK).send(url);
    },
  );

  app.get(
    '/urls',
    {
      schema: {
        tags: ['Urls'],
        description: 'List urls',
        querystring: listUrlSchema,
        response: {
          [StatusCodes.OK]: z.object({
            items: z.array(urlResponseSchema).default([]),
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const user = currentUser(request);
      const queries = request.query;
      const controller = ListUrlController();
      const urls = await controller.execute({
        ...queries,
        userId: user.sub,
      });
      return reply.status(StatusCodes.OK).send(urls);
    },
  );

  app.put(
    '/urls/:id',
    {
      schema: {
        tags: ['Urls'],
        description: 'Update a url',
        body: updateUrlSchema,
        params: paramUrlSchema,
        response: {
          [StatusCodes.OK]: urlResponseSchema,
          [StatusCodes.NOT_FOUND]: errorResponseSchema.default({
            code: 'not.found',
            message: 'Url not found',
            statusCode: StatusCodes.NOT_FOUND,
            error: ReasonPhrases.NOT_FOUND,
          }),
          [StatusCodes.CONFLICT]: errorResponseSchema.default({
            code: 'duplicate.email',
            message: 'Url already exist',
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const user = currentUser(request);
      const params = request.params;
      const body = request.body;
      const controller = UpdateUrlController();
      const url = await controller.execute(params.id, {
        ...body,
        userId: user.sub,
      });
      return reply.status(StatusCodes.OK).send(url);
    },
  );
}
