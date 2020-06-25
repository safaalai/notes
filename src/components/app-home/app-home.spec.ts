import { newSpecPage } from '@stencil/core/testing';
import { AppHome } from './app-home';

describe('app-home tests', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });
    expect(page.root).toEqualHtml(`
      <app-home>
        <mock:shadow-root>
          <div class='app-home'>
            <fsk-notes-list></fsk-notes-list>
          </div>
        </mock:shadow-root>
      </app-home>
    `);
  });
});
