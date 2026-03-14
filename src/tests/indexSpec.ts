import app from '../index.js';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /', () => {
  it('should return a 200 status', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

});