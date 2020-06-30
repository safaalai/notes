import { newSpecPage } from '@stencil/core/testing';

jest.mock('../../library/NotesData', () => ({
  getList: () => JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
    ]`
  )
}));
import { FskNotesList } from './fsk-notes-list';

describe('fsk-notes-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-notes-list>
        <mock:shadow-root>
          <div>
            <div>Notes List</div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date/Time</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>March 4, 2020 5:13 AM</td>
                  <td>My Fourth Note</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>March 3, 2020 4:12 AM</td>
                  <td>My Third Note</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>March 2, 2020 3:11 AM</td>
                  <td>My Second Note</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>March 1, 2020 2:10 AM</td>
                  <td>My First Note</td>
                </tr>
              </tbody>
            </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });
});
