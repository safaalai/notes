import {app} from './app';
import request from 'supertest';

// Use test api
import * as testapi from './test-api';
app.use('/test',testapi.router);

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

  it('should add a note', async () => {
    // get list so we can get an id
    let response = await request(app).post('/api/note/add');
    expect(response.status).toBe(201);

    // get note for first list item
    const noteId = response.text;
    response = await request(app).get(`/api/note/${noteId}`);
    expect(response.status).toBe(200);

    // parse the note and check its values
    const note = JSON.parse(response.text);
    expect(note.id).toBe(noteId);
    expect(note.title).toBe('untitled');
    expect(note.text).toBe('');
  });

  it('should save a note', async () => {
    // get list so we can get an id
    let response = await request(app).get('/api/list');
    const list = JSON.parse(response.text);
    const noteId = list[0].id;

    // save note
    response = await request(app)
      .put('/api/note/save/'+noteId)
      .send({title: 'test title', text:'test text'});

    // check response is ok
    expect(response.status).toBe(200);
    expect(response.text).toBe(noteId);

    // get note for first list item
    response = await request(app).get(`/api/note/${noteId}`);
    expect(response.status).toBe(200);
    const note = JSON.parse(response.text);

    // parse the note and check its values
    expect(note.id).toBe(noteId);
    expect(note.title).toBe('test title');
    expect(note.text).toBe('test text');
  });

  it('should get an error if saving note that does not exist', async () => {
    // save note
    const response = await request(app)
      .put('/api/note/save/-1')
      .send({title: 'test title', text:'test text'});
    expect(response.status).toBe(404);
    expect(response.text).toBe("-1");
  });

  it('should delete a note', async () => {
    // get list so we can get an id
    let response = await request(app).get('/api/list');
    const list = JSON.parse(response.text);
    const noteId = list[0].id;

    // delete note
    response = await request(app).delete('/api/note/'+noteId);

    // check response is ok
    expect(response.status).toBe(200);
    expect(response.text).toBe(noteId);

    // get note for first list item
    response = await request(app).get(`/api/note/${noteId}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe(noteId);
  });

  it('should error out if note id is not valid', async () => {
    const response = await request(app).delete('/api/note/-1');
    expect(response.status).toBe(404);
    expect(response.text).toBe('-1');
  });
});
