import {app} from './app';
import request from 'supertest';

describe('gateway tests', () => {
  it('should say hello', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
