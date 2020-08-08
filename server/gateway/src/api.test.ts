import {app} from './app';
import request from 'supertest';

describe('Gateway API Tests', () => {
  it('should get the notes list', async () => {
    const response = await request(app).get('/api/list');
    expect(response.status).toBe(200);
    expect(response.text).toBe('list');
  });

  it('should get a note', async () => {
    const response = await request(app).get('/api/note/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('note:1');
  });

  it('should add a note', async () => {
    const response = await request(app).post('/api/note/add');
    expect(response.status).toBe(201);
    expect(response.text).toBe('add new note');
  });

  it('should save a note', async () => {
    const response = await request(app).put('/api/note/save/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('save note:1');
  });

  it('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('deleted note:1');
  });
});
