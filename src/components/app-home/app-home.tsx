import { Component, h, Listen, State } from '@stencil/core';

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
    this.noteDisplay = <fsk-note note-id={event.detail}></fsk-note>
  }

  @Listen('closeNote')
  onClose() { this.noteDisplay = ''; }

  render() {
    return (
      <div class='app-home'>
        <fsk-notes-list></fsk-notes-list>
        {this.noteDisplay}
      </div>
    );
  }
}
