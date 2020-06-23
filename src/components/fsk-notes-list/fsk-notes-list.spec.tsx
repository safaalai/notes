import { newSpecPage } from '@stencil/core/testing';
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
          <slot></slot>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });
});
