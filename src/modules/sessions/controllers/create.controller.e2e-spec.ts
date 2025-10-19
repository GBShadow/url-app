import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../../../../test/setup-e2e';

describe('E2E with Supertest', () => {
  it('GET /hello should return message', async () => {
    const res = await request(app.server).get('/hello').expect(200);

    expect(res.body).toEqual({ message: 'Hello from Supertest' });
  });
});
