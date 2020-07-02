import { newSpecPage } from '@stencil/core/testing';
import { FskNote } from './fsk-note';

describe('fsk-note', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-note note-id="1">
        <mock:shadow-root>
         <div>Now displaying note: 1</div>
        </mock:shadow-root>
      </fsk-note>
    `);
  });
});
