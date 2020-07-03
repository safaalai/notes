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
    expect(notesData.getList()).toEqual(expectedData);
  });

  test('getNote returns expected note', () => {
    const expectedResults = JSON.parse(`
      {"datetime": "2020-03-01T10:10Z", "id": "1", "title": "My First Note"}
    `);
    expect(notesData.getNote(1)).toEqual(expectedResults);
  });
});
