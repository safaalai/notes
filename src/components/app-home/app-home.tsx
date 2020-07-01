import { Component, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {
  @State() noteDisplay = '';

  @Listen('selectedNote')
  onSelectedNote(event: CustomEvent) {
    this.noteDisplay = <p>Now showing note {event.detail}</p>
  }

  render() {
    return (
      <div class='app-home'>
        <fsk-notes-list></fsk-notes-list>
        {this.noteDisplay}
      </div>
    );
  }
}
