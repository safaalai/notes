import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

import * as notesData from './NotesData';

describe('NotesData Integration Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
    ]`    
  );

  beforeEach(async () => {
    await axios.put('/test/reset');
  });

  afterAll(async () => {
    await axios.put('/test/reset');
  })

  it('should get a Notes List', async () => {
    const data = await notesData.getList();
    expect(data).toEqual(expectedData);
  });

  it('should get a note or get an error', async () => {
    const expectedNote = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", "title": "My First Note",
       "text":"Text for my first note"}
    `);

    // Test we get a note as expected
    const data = await notesData.getNote(1);
    expect(data).toEqual(expectedNote);

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote(-1);
      fail('saveNote did not return an error');
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(-1);
    }
  });

  it('should add a note', async () => {
    // Create note and check id
    const noteId = await notesData.addNote();
    expect(noteId).toBe(5);

    // Fetch note to make sure it was created
    const note = await notesData.getNote(5);
    expect(note.id).toBe(noteId.toString());
    expect(note.text).toBe('');
    expect(note.title).toBe('untitled');
  });

  it('should delete a note or get an error', async () => {
    // delete note and check returned id
    const noteId = await notesData.deleteNote(2);
    expect(noteId).toBe(2);

    // fetch note #2 to prove it does not exist
    try {
      await notesData.getNote(2);
      fail('saveNote did not return an error');
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(2);
    }

    // delete note that does not exist
    try {
      await notesData.deleteNote(2);
      fail('saveNote did not return an error');
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(2);
    }
  });

  it('should save a note or get an error', async () => {
    // save note and check returned id
    const noteId = await notesData.saveNote(1, "Edited title", "Edited text");
    expect(noteId).toBe(1);

    // fetch saved note and check its content
    const note = await notesData.getNote(1);
    expect(note.title).toBe('Edited title');
    expect(note.text).toBe('Edited text');

    // test saving with a bad id
    try {
      await notesData.saveNote(-1, "Edited title", "Edited text");
      fail('saveNote did not return an error');
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(-1);
    }
  });
});
