import request from 'supertest';
import app from '../index.js'; // your real app, exported from index.js

describe('Health Check', () => {
  it('GET /health should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});

describe('CRUD Operations', () => {
  // NOTE: You can mock db calls if you don’t want a live DB in CI.
  // Example: jest.mock('pg') and fake responses.

  it('POST /add should add a new task', async () => {
    const res = await request(app)
      .post('/add')
      .send({ newItem: 'Test Task' });
    expect([200, 302]).toContain(res.status); // redirect or success
  });

  it('POST /edit should edit an existing task', async () => {
    const res = await request(app)
      .post('/edit')
      .send({ updatedItemId: 1, updatedItemTitle: 'Updated Task' });
    expect([200, 302]).toContain(res.status);
  });

  it('POST /delete should delete an existing task', async () => {
    const res = await request(app)
      .post('/delete')
      .send({ deleteTaskId: 1 });
    expect([200, 302]).toContain(res.status);
  });
});
