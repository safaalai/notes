import { newE2EPage } from '@stencil/core/testing';

describe('app-home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    const element = await page.find('app-home');
    expect(element).toHaveClass('hydrated');
  });

  it('shows a note on click', async () => {
    // Setup
    const page = await newE2EPage();
    await page.setContent('<app-home></app-home>');

    // Check no note is displayed
    const note = await page.find('app-home >>> fsk-note');
    expect(note).toBeNull();

    // Click on a note in notes list
    await page.evaluate( () => {
      const appHome = document.querySelector('app-home');
      const notesList = appHome.shadowRoot.querySelector('fsk-notes-list');
      const noteRow : HTMLElement = notesList.shadowRoot.querySelector('#note1');
      noteRow.click();
    });

    await page.waitForChanges();

    // Check note is displayed
    const note1 = await page.find('app-home >>> fsk-note');
    expect(note1).not.toBeNull();
    expect(note1).toHaveAttribute('note-id');
    expect(note1.getAttribute('note-id')).toBe('1');
  });
});
