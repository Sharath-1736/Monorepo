const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/v1/users/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  // Add more tests for user creation, fetching, etc.
});
