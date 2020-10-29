import { Component, ComponentInterface, h, Prop, Event, Element, State } from '@stencil/core';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';
import { getNote, saveNote, deleteNote } from '../../library/NotesData';

/**
 * Displays a note
 */
@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote implements ComponentInterface {
  @Element() el: HTMLElement;

  /** data-test property for testing */
  @Prop() dataTest: string;

  /** HTML property note-id: id of the note to display */
  @Prop() noteId: string;

  /** note to render */
  @State() note: any;
  
  /** Fetch note from server before render */
  async componentWillLoad() {
    return getNote(this.noteId).then( response => {
      this.note = response;
    });
  }

  /** Sent when user clicks on close button
   * @event
   */
  @Event() closeNote: EventEmitter;

  /** Called from HTML when user clicks on the close button */
  onClose() { this.closeNote.emit(); }

  /** Sent when user clicks on the save button
   * @event
   */
  @Event() saveNote: EventEmitter;

  /** Called from HTML when user clicks on the save button */
  async onSave() { 
    const root = this.el.shadowRoot;
    const title : HTMLInputElement = root.querySelector('#fsk-note-title');
    const text : HTMLInputElement = root.querySelector('#fsk-note-content');
    //console.log(title.value + "," + text.value);
    await saveNote(this.noteId, title.value, text.value);
    this.saveNote.emit();
  }

  /** Called from HTML when user clicks on the delete button */
  async onDelete() {
    await deleteNote(this.noteId);
    this.closeNote.emit();
  }

  render() {
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <input id="fsk-note-title" value={this.note.title}/>
          <nav id="fsk-note-save" 
            onClick={() => this.onSave()} class="fsk-note-button">
            Save
          </nav>
          <nav id="fsk-note-delete" 
            onClick={() => this.onDelete()} class="fsk-note-button">
            Delete
          </nav>
          <nav id="fsk-note-close" 
            onClick={() => this.onClose()} class="fsk-note-button">
            Close
          </nav>
        </header>
        <textarea id="fsk-note-content">
          {this.note.text}
        </textarea>
      </div>
    );
  }

}
