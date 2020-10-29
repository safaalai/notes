import { Component, h, Listen, State } from '@stencil/core';
import { addNote } from '../../library/NotesData';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {
  /** 
   * Will cause render to display the contents of a note
   */
  @State() noteDisplay = '';

  /**
   * Event handler for selectedNote event
   * @param event - selectedNote event received when user selects note
   */
  @Listen('selectedNote')
  onSelectedNote(event: CustomEvent) {
    this.noteDisplay = 
      <fsk-note 
        data-test={event.detail.datatest}
        note-id={event.detail.noteid}>
      </fsk-note>
  }

  /** Event handler for closeNote event */
  @Listen('closeNote')
  onClose() { this.noteDisplay = ''; }

  /** Event handler for add note button press */
  async onAddNote() {
    const noteId = await addNote();
    this.noteDisplay = 
      <fsk-note data-test='note10' note-id={noteId}></fsk-note>
  }

  render() {
    return (
      <div class='app-home'>
        <button id="app-home-add-note" onClick={() => this.onAddNote()}>
          Add Note
        </button>
        <fsk-notes-list></fsk-notes-list>
        {this.noteDisplay}
      </div>
    );
  }
}
