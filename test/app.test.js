import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

// Minimal example of your app
const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Basic API tests', () => {
  it('GET /health should return 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

