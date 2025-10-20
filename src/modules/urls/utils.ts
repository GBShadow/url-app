import { env } from '@/env';
import { randomString } from '@/functions/utils';
import { IUrlRepository } from './interfaces/url-repository';
import { AppError } from '@/errors/app-error';

export async function generatedUrlHelper(
  userId?: string,
  urlRepository?: IUrlRepository,
) {
  const param = randomString();
  if (!userId) {
    return `${env.DOMAIN}/${param}`;
  }

  if (!urlRepository) {
    throw new AppError({
      message: 'urlRepository required',
    });
  }
  const foundURL = await urlRepository.findByParam(param);

  if (foundURL) {
    generatedUrlHelper(userId, urlRepository);
  }

  return `${env.DOMAIN}/${param}`;
}
