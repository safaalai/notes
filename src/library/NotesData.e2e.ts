import axios from 'axios';
import app from '../global/app.dev';
app();

import * as notesData from './NotesData';

describe('NotesData Integration Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"title":"My First Note"},
      {"title":"My Second Note"},
      {"title":"My Third Note"},
      {"title":"My Fourth Note"}
    ]`    
  );

  beforeEach(async () => {
    await axios.put('/test/reset');
  });

  afterAll(async () => {
    await axios.put('/test/reset');
  })

  it('should get a Notes List', async () => {
    const list = await notesData.getList();
    expect(list.length).toBe(4);
    for(let i=0; i<list.length; ++i)
      expect(list[i].title).toBe(expectedData[i].title);
  });

  it('should get a note or get an error', async () => {
    const expectedNote = JSON.parse(`
      {"title": "My First Note",
       "text":"Text for my first note"}
    `);

    // Get note id from the notes list
    const list = await notesData.getList();
    const noteId = list[0].id;

    // Test we get a note as expected
    const note = await notesData.getNote(noteId);
    expect(note.id).toBe(noteId);
    expect(note.datetime).toBe(list[0].datetime);
    expect(note.title).toBe(expectedNote.title);
    expect(note.text).toBe(expectedNote.text);

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote("-1");
      fail('saveNote did not return an error');
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(-1);
    }
  });

  it('should add a note', async () => {
    // Create note and check id
    const noteId = await notesData.addNote();

    // Fetch note to make sure it was created
    const note = await notesData.getNote(noteId);
    expect(note.id).toBe(noteId);
    expect(note.text).toBe('');
    expect(note.title).toBe('untitled');
  });

  it('should delete a note or get an error', async () => {
    // Get note id from the notes list
    const list = await notesData.getList();
    const noteId = list[0].id;

    // delete note and check returned id
    const deletedId = await notesData.deleteNote(noteId);
    expect(deletedId).toBe(noteId);

    // fetch note #2 to prove it does not exist
    try {
      await notesData.getNote("2");
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
    // Get note id from the notes list
    const list = await notesData.getList();
    const noteId = list[0].id;

    // save note and check returned id
    const savedId = await notesData.saveNote(noteId, "Edited title", "Edited text");
    expect(savedId).toBe(noteId);

    // fetch saved note and check its content
    const note = await notesData.getNote(noteId);
    expect(note.title).toBe('Edited title');
    expect(note.text).toBe('Edited text');

    // test saving with a bad id
    try {
      await notesData.saveNote("-1", "Edited title", "Edited text");
      fail('saveNote did not return an error');
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(-1);
    }
  });
});
