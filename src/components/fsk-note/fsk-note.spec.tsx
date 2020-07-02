import { newSpecPage } from '@stencil/core/testing';
import { FskNote } from './fsk-note';

describe('fsk-note', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note></fsk-note>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-note>
        <mock:shadow-root>
          <div>TODO: Display a note</div>
        </mock:shadow-root>
      </fsk-note>
    `);
  });
});
