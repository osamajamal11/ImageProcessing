import app from '../../../index.js';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /api/images', () => {
  it('should return 400 when no filename is provided', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
    expect(response.text).toContain('filename');
  });

  it('should return 400 for invalid width', async () => {
    const response = await request.get(
      '/api/images?filename=test.jpg&width=abc',
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain('Width');
  });

  it('should return 400 for invalid height', async () => {
    const response = await request.get(
      '/api/images?filename=test.jpg&height=-5',
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain('Height');
  });

  it('should return 200 for a valid filename without dimensions', async () => {
    const response = await request.get('/api/images?filename=test.jpg');
    expect(response.status).toBe(200);
  });

  it('should return 404 for a missing image with valid dimensions', async () => {
    const response = await request.get(
      '/api/images?filename=nonexistent.jpg&width=200&height=200',
    );
    expect(response.status).toBe(404);
  });
});
