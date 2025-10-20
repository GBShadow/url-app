import { DeleteUrlService } from '@/modules/urls/services/delete.service';
import { AppError } from '@/errors/app-error';
import { FakeUrlRepository } from '../../../../test/repositories/fake-url.repositoy';
import { Url } from '@prisma/client';

describe('DeleteUrlService', () => {
  it('should delete an existing URL', async () => {
    const repo = FakeUrlRepository();
    const service = DeleteUrlService(repo);

    const created = (await repo.create({
      baseUrl: 'https://example.com',
      generatedUrl: 'https://short.ly/abc123',
      userId: 'user-123',
    })) as Url;

    const deleteDTO = {
      id: created.id,
      userId: created.userId!,
    };

    await expect(service.execute(deleteDTO)).resolves.toBeUndefined();

    const urlAfterDelete = await repo.findById(deleteDTO);
    expect(urlAfterDelete?.deletedAt).toBeInstanceOf(Date);
  });

  it('should throw AppError if URL does not exist', async () => {
    const repo = FakeUrlRepository();
    const service = DeleteUrlService(repo);

    const deleteDTO = {
      id: 'non-existent-id',
      userId: 'user-123',
    };

    await expect(service.execute(deleteDTO)).rejects.toBeInstanceOf(AppError);
  });
});
