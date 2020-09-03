import {app} from './app';
import request from 'supertest';

describe('gateway tests', () => {
  it('should serve web components', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toMatch('<!doctype html>');
    expect(response.text).toMatch('<app-root></app-root');
  });
});
