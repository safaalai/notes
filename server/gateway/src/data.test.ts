import * as data from './data';

describe('Data Tests', () => {
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

  test.skip('saveNote should save a note', async () => {
    const expectedResults = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", 
      "title": "Edited Test Title",
       "text":"Edited Test Text"}
    `);

    data.saveNote('1', "Edited Test Title", "Edited Test Text");

    const note = data.getNote('1');
    expect(note).toEqual(expectedResults);
  });

  test.skip('saveNote returns throws error if id is invalid', async () => {
    expect( () => data.saveNote('-1', 'a', 'a') ).toThrowError();
  });

  test.skip('addNote should add a new note', async () => {
    const expectedResults = JSON.parse(`
      {
        "id":"5","datetime":"2020-05-14T11:20:00.000Z",
        "title":"untitled",
        "text":""
      }
    `);

    // Mock Date.now() to return a fixed testable date-time
    jest.spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2020-05-14T11:20Z').valueOf()
      );

    // Add note 5 & check for results
    const newNoteId = data.addNote();
    expect(newNoteId).toBe('5');

    const note = data.getNote(newNoteId.toString());
    expect(note).toEqual(expectedResults);
  });

  test.skip('deleteNote deletes the right note', async () => {
    const deletedId = data.deleteNote('2');
    expect(deletedId).toBe('2');
    expect( () => data.getNote('2') ).toThrowError();
  });

  test('reset sets data back to defaults', async () => {
    // // Change the data
    // data.addNote();

    // // Check that data is not as expected
    // const list = data.getList();
    // expect(list).not.toEqual(expectedData);
    // const id = data.addNote();
    // expect(id).not.toEqual('5');

    // Reset data and check it matches defaults
    await data.reset();
    const resetList = await data.getList();
    expect(resetList.length).toBe(4);
    for(let i=0; i<resetList.length; ++i)
      expect(resetList[i].title).toBe(expectedData[i].title);
  });
});
