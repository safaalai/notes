import * as data from './data';

describe('Data Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
    ]`    
  );

  test.skip('getList returns expected data', async () => {
    const list = data.getList();
    expect(list).toEqual(expectedData);
  });

  test.skip('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", "title": "My First Note",
       "text":"Text for my first note"}
    `);
    const note = data.getNote('1');
    expect(note).toEqual(expectedResults);
  });

  test.skip('getNote returns throws error if id is invalid', async () => {
    expect( () => data.getNote('-1') ).toThrowError();
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
    // const resetList = data.getList();
    // expect(resetList).toEqual(expectedData);
    // const resetId = data.addNote();
    // expect(resetId).toEqual('5');
  });
});
