import { Component, ComponentInterface, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';

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

  @Event() closeNote: EventEmitter;
  onClose() { this.closeNote.emit(); }

  render() {
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <strong>Note Title</strong>
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
