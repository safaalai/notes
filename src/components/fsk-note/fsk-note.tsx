import { Component, ComponentInterface, Host, h } from '@stencil/core';

/**
 * Displays a note
 */
@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote implements ComponentInterface {

  render() {
    return (
      <div>TODO: Display a note</div>
    );
  }

}
