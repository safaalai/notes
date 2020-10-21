import * as Utils from './Utils';

describe('Utils tests', () => {
  test('getDateTime returns expected date', () => {
    // Mock Date.now() to return a fixed testable date-time
    jest.spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2020-05-14T11:20Z').valueOf()
      );
    expect(Utils.getDateTime()).toBe('2020-05-14T11:20:00.000Z');
  });

  test('array2Obj converts array to object', () => {
    const arr = [
      {id:'1',content:'a'},
      {id:'2',content:'b'},
      {id:'3',content:'c'}
    ];

    const result = Utils.array2Obj(arr, 'id');
    expect(result).toEqual(
      JSON.parse(`
        {
          "1":{"id":"1","content":"a"},
          "2":{"id":"2","content":"b"},
          "3":{"id":"3","content":"c"}
        }
      `)
    );
  });

  test('DBConnect gets query response from database', async () => {
    const db = new Utils.DBConnect();
    const query = {"operation":"system_information"};
    const response = await db.send(query);
    expect(JSON.stringify(response)).toMatch('"platform":"linux"');
  });
});
