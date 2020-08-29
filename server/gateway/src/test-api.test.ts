import {app} from './app';
import request from 'supertest';
import * as testapi from './test-api';
app.use('/test', testapi.router);

describe('Test API Tests', () => {
  it('should reset data', async () => {
    const expectedData = JSON.parse(
      `[
        {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
        {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
        {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
        {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
      ]`    
    );
  
    // Make a change
    await request(app).post('/api/note/add');

    // Check data does not match defaults
    let response = await request(app).get('/api/list');
    expect(response.status).toBe(200);
    expect(response.text).not.toBe(JSON.stringify(expectedData));
    response = await request(app).post('/api/note/add');
    expect(response.status).toBe(201);
    expect(response.text).not.toBe('5'); 

    // Reset the data
    response = await request(app).put('/test/reset');
    expect(response.text).toBe('RESET OK');

    // Check data is reset back to defaults
    response = await request(app).get('/api/list');
    expect(response.status).toBe(200);
    expect(response.text).toBe(JSON.stringify(expectedData));

    // Check note id will be 5
    response = await request(app).post('/api/note/add');
    expect(response.status).toBe(201);
    expect(response.text).toBe('5');
  });
});
