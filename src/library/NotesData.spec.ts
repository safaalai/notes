import axios from 'axios';
const mock = jest.spyOn(axios,'get');

import * as notesData from './NotesData';

describe('NotesData Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
    ]`    
  );

  test('getList returns expected data', async () => {
    mock.mockResolvedValue({data: 'hello'});
    const data = await notesData.getList();
    expect(data).toEqual(expectedData);
  });

  test('getNote returns expected note', () => {
    const expectedResults = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", "title": "My First Note",
       "text":"Text for my first note"}
    `);
    expect(notesData.getNote(1)).toEqual(expectedResults);
  });

  test('getNote returns empty object if id is invalid', () => {
    const note = notesData.getNote(-1);
    expect( Object.keys(note).length ).toBe(0);
  });

  test('saveNote should save a note', () => {
    const expectedResults = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", 
      "title": "Edited Test Title",
       "text":"Edited Test Text"}
    `);

    notesData.saveNote(1, "Edited Test Title", "Edited Test Text");
    expect(notesData.getNote(1)).toEqual(expectedResults);
  });

  test('addNote should add a new note', () => {
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
    const newNoteId = notesData.addNote();
    expect(newNoteId).toBe(5);
    expect(notesData.getNote(5)).toEqual(expectedResults);
  });

  test('deleteNote deletes the right note', () => {
    notesData.deleteNote(2);
    expect( Object.keys(notesData.getNote(2)).length ).toBe(0);
  });
});
