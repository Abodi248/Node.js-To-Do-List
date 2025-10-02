jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn().mockResolvedValue(), // resolves immediately
    query: jest.fn().mockResolvedValue({ rows: [] }),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

const request = require('supertest');
const app = require('../index.js');
const pg = require('pg');

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
    const res = await request(app).post('/add').send({ newItem: 'Test Task' });
    expect([200, 302]).toContain(res.status);
  });

  it('POST /edit should edit an existing task', async () => {
    const res = await request(app).post('/edit').send({ updatedItemId: 1, updatedItemTitle: 'Updated Task' });
    expect([200, 302]).toContain(res.status);
  });

  it('POST /delete should delete an existing task', async () => {
    const res = await request(app).post('/delete').send({ deleteTaskId: 1 });
    expect([200, 302]).toContain(res.status);
  });
});

describe('Edge Case Tests', () => {
  const { Client } = require('pg');
  const mockClient = new Client();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET / handles DB error', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('DB fail'));
    const res = await request(app).get('/');
    expect(res.status).toBe(200); // route still renders
  });

  it('POST /add redirects on empty item', async () => {
    const res = await request(app).post('/add').send({ newItem: '   ' });
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
  });

  it('POST /edit redirects on empty title', async () => {
    const res = await request(app).post('/edit').send({ updatedItemId: 1, updatedItemTitle: '   ' });
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
  });

  it('POST /delete handles DB error', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('Delete fail'));
    const res = await request(app).post('/delete').send({ deleteTaskId: 1 });
    expect(res.status).toBe(302);
  });
});

afterAll(async () => {
  const { Client } = require('pg');
  const mockClient = new Client();
  await mockClient.end(); // closes any open connections
});

