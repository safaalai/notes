import { newE2EPage } from '@stencil/core/testing';

describe('fsk-notes-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fsk-notes-list></fsk-notes-list>');

    const element = await page.find('fsk-notes-list');
    expect(element).toHaveClass('hydrated');
  });
});
