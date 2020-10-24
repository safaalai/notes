import * as Utils from './Utils';

describe('Utils tests', () => {
  test('DBConnect gets query response from database', async () => {
    const db = new Utils.DBConnect();
    const query = {"operation":"system_information"};
    const response = await db.send(query);
    expect(JSON.stringify(response)).toMatch('"platform":"linux"');
  });
});
