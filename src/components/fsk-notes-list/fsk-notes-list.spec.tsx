import { newSpecPage } from '@stencil/core/testing';

jest.mock('../../library/NotesData', () => ({
  getList: () => 'test hello list',
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
                  <th>
                    test hello list
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });
});
