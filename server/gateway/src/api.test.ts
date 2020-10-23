import {app} from './app';
import request from 'supertest';

// Use test api
import * as testapi from './test-api';
app.use('/test',testapi.router);

// Mock Date.now to return testable time
jest.spyOn(global.Date,'now').mockImplementation(
  () => new Date("2019-05-14T11:01:58.135Z").valueOf()
);

describe('Gateway API Tests', () => {
  beforeEach(async () => await request(app).put('/test/reset'));
  afterAll(async () => await request(app).put('/test/reset'));

  it('should get the notes list', async () => {
    const expectedData = JSON.parse(
      `[
        {"title":"My First Note"},
        {"title":"My Second Note"},
        {"title":"My Third Note"},
        {"title":"My Fourth Note"}
      ]`    
    );
  
    // issue call to server to get notes list & check return is ok
    const response = await request(app).get('/api/list');
    expect(response.status).toBe(200);

    // extract list
    const list = JSON.parse(response.text);
    expect(list.length).toBe(4);
    for(let i=0; i<list.length; ++i)
      expect(list[i].title).toBe(expectedData[i].title);
  });

  it('should get a note', async () => {
    const expectedResults = JSON.parse(`
      {"title": "My First Note",
       "text":"Text for my first note"}
    `);
    
    // get list so we can get an id
    let response = await request(app).get('/api/list');
    const list = JSON.parse(response.text);

    // get note for first list item
    response = await request(app).get(`/api/note/${list[0].id}`);
    expect(response.status).toBe(200);

    // parse the note and check its values
    const note = JSON.parse(response.text);
    expect(note.id).toBe(list[0].id);
    expect(note.datetime).toBe(list[0].datetime);
    expect(note.title).toBe(expectedResults.title);
    expect(note.text).toBe(expectedResults.text);
  });

  it('should get an error if the note does exist', async () => {
    const response = await request(app).get('/api/note/-1');
    expect(response.status).toBe(404);
    expect(response.text).toBe("-1");
  });

  it.skip('should add a note', async () => {
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

  it.skip('should save a note', async () => {
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

  it.skip('should get an error if saving note that does not exist', async () => {
    // save note
    const response = await request(app)
      .put('/api/note/save/-1')
      .send({title: 'test title', text:'test text'});
    expect(response.status).toBe(404);
    expect(response.text).toBe("-1");
  });

  it.skip('should delete a note', async () => {
    const response = await request(app).delete('/api/note/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('1');
  });

  it.skip('should error out if note id is not valid', async () => {
    const response = await request(app).delete('/api/note/-1');
    expect(response.status).toBe(404);
    expect(response.text).toBe('-1');
  });
});
