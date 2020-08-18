import {app} from './app';
import request from 'supertest';

describe('Gateway API Tests', () => {
  it('should get the notes list', async () => {
    const expectedData = JSON.parse(
      `[
        {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
        {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
        {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
        {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
      ]`    
    );
  
    const response = await request(app).get('/api/list');
    expect(response.status).toBe(200);
    expect(response.text).toBe(JSON.stringify(expectedData));
  });

  it('should get a note', async () => {
    const expectedResults = JSON.parse(`
      {"id": "1", "datetime": "2020-03-01T10:10Z", "title": "My First Note",
       "text":"Text for my first note"}
    `);
    
    const response = await request(app).get('/api/note/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe(JSON.stringify(expectedResults));
  });

  it('should get an error if the note does exist', async () => {
    const response = await request(app).get('/api/note/-1');
    expect(response.status).toBe(404);
    expect(response.text).toBe("-1");
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
