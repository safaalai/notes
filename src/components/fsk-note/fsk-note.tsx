import { Component, ComponentInterface, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';
import { getNote } from '../../library/NotesData';

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

  /** Sent when user clicks on close button
   * @event
   */
  @Event() closeNote: EventEmitter;

  /** Called from HTML when user clicks on the close button */
  onClose() { this.closeNote.emit(); }

  render() {
    const note = getNote(this.noteId);
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <strong>{note.title}</strong>
          <nav 
            onClick={() => this.onClose()} 
            class="fsk-note-button">
            Close
          </nav>
        </header>
        <div class="fsk-note-content">
          Now displaying note: {this.noteId}
        </div>
      </div>
    );
  }

}
