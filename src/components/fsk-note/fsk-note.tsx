import { Component, ComponentInterface, h, Prop } from '@stencil/core';

/**
 * Displays a note
 */
@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote implements ComponentInterface {
  /** HTML property note-id: id of the note to display */
  @Prop() noteId: number;

  render() {
    return (
      <div>Now displaying note: {this.noteId}</div>
    );
  }

}
