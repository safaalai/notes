import {app} from './app';
import request from 'supertest';

// Mock Date.now to return testable time
jest.spyOn(global.Date,'now').mockImplementation(
  () => new Date("2019-05-14T11:01:58.135Z").valueOf()
);

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
    let response = await request(app).post('/api/note/add');
    expect(response.status).toBe(201);
    expect(response.text).toBe('5');

    // Get the new note to check its content
    response = await request(app).get('/api/note/5');
    expect(response.status).toBe(200);

    const expectedResults = JSON.parse(`
      {"id":"5","datetime":"2019-05-14T11:01:58.135Z",
      "title":"untitled","text":""}
    `);
    expect(response.text).toBe(JSON.stringify(expectedResults));
  });

  it('should save a note', async () => {
    // save note
    let response = await request(app)
      .put('/api/note/save/1')
      .send({title: 'test title', text:'test text'});

    // check response is ok
    expect(response.status).toBe(200);
    expect(response.text).toBe('1');

    // Get note back
    response = await request(app).get('/api/note/1');
    expect(response.status).toBe(200);

    const expectedResults = JSON.parse(`
      {"id":"1","datetime":"2020-03-01T10:10Z",
      "title":"test title","text":"test text"}
    `);
    expect(response.text).toBe(JSON.stringify(expectedResults));
  });

  it('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('1');
  });

  it('should error out if note id is not valid', async () => {
    const response = await request(app).delete('/api/note/-1');
    expect(response.status).toBe(404);
    expect(response.text).toBe('-1');
  });
});
