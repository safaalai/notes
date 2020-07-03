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
          <div class="fsk-note">
            <header class="fsk-note-header">
              <strong>Note Title</strong>
              <nav class="fsk-note-button">Close</nav>
            </header>
            <div class="fsk-note-content">
              Now displaying note: 1
            </div>
          </div>
        </mock:shadow-root>
      </fsk-note>
    `);
  });

  it('should emit event when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });

    const button : HTMLElement 
      = (page.root.shadowRoot.querySelector(".fsk-note-button"));
    const spy = jest.fn();
    page.win.addEventListener('closeNote',spy);

    button.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
