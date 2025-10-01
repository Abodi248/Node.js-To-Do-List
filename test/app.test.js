import request from 'supertest';
import app from '../index.js';
import pg from 'pg';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn().mockResolvedValue({ rows: [] }),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('Health Check', () => {
  it('GET /health should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});

describe('CRUD Operations', () => {
  it('POST /add should add a new task', async () => {
    const res = await request(app)
      .post('/add')
      .send({ newItem: 'Test Task' });
    expect([200, 302]).toContain(res.status);
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
