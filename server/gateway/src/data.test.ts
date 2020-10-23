import * as data from './data';

describe('Data Tests', () => {
  beforeEach(async () => { await data.reset(); })
  afterAll(async () => { await data.reset(); })

  const expectedData = JSON.parse(
    `[
      {"title":"My First Note"},
      {"title":"My Second Note"},
      {"title":"My Third Note"},
      {"title":"My Fourth Note"}
    ]`    
  );

  test('getList returns expected data', async () => {
    const list = await data.getList();
    expect(list.length).toBe(4);
    for(let i=0; i<list.length; ++i)
      expect(list[i].title).toBe(expectedData[i].title);
  });

  test('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"title": "My First Note",
       "text":"Text for my first note"}
    `);
    const list = await data.getList();
    const note = await data.getNote(list[0].id);
    expect(note.id).toBe(list[0].id);
    expect(note.datetime).toBe(list[0].datetime);
    expect(note.title).toBe(expectedResults.title);
    expect(note.text).toBe(expectedResults.text);
  });

  test('getNote returns throws error if id is invalid', async () => {
    expect( () => data.getNote('-1') ).rejects.toThrowError();
  });

  test('saveNote should save a note', async () => {
    const expectedResults = JSON.parse(`
      {"title": "Edited Test Title","text":"Edited Test Text"}
    `);

    // Get list to get the note id
    const list = await data.getList();

    // save note and check response is correct
    const id = await data.saveNote(
      list[1].id, "Edited Test Title", "Edited Test Text");
    expect(id).toBe(list[1].id);

    // Get the note to check it saved
    const note = await data.getNote(id);
    expect(note.title).toBe(expectedResults.title);
    expect(note.text).toBe(expectedResults.text);
  });

  test('saveNote throws error if id is invalid', async () => {
    expect(data.saveNote('-1', 'a', 'a') ).rejects.toThrowError();
  });

  test('addNote should add a new note', async () => {
    const expectedResults = JSON.parse(`{"title":"untitled","text":"" }`);

    // Add note 5 & check for results
    const newNoteId = await data.addNote();

    // Get new note and check it is as expected
    const note = await data.getNote(newNoteId);
    expect(note.title).toBe(expectedResults.title);
    expect(note.text).toBe(expectedResults.text);
  });

  test('deleteNote deletes the right note', async () => {
    const list = await data.getList();
    const deletedId = await data.deleteNote(list[0].id);
    expect(deletedId).toBe(list[0].id);
    expect(data.getNote(deletedId)).rejects.toThrowError();
  });

  test('deleteNote throws error if id is invalid', async () => {
    expect(data.deleteNote('-1') ).rejects.toThrowError();
  });

  test('reset sets data back to defaults', async () => {
    // Change the data
    await data.addNote();

    // Check that data is not as expected
    const list = await data.getList();
    expect(list.length).not.toBe(4);

    // Reset data and check it matches defaults
    await data.reset();
    const resetList = await data.getList();
    expect(resetList.length).toBe(4);
    for(let i=0; i<resetList.length; ++i)
      expect(resetList[i].title).toBe(expectedData[i].title);
  });
});
