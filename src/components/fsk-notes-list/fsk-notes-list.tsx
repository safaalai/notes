import { Component, ComponentInterface, h, Event, State, Listen } from '@stencil/core';
import { getList } from '../../library/NotesData';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';

dayjs.locale('en');

/** 
 * Lists notes
*/
@Component({
  tag: 'fsk-notes-list',
  styleUrl: 'fsk-notes-list.css',
  shadow: true,
})
export class FskNotesList implements ComponentInterface {
  /** Note list state variable */
  @State() notes = [];

  async componentWillLoad() {
    return getList().then( response => {
      this.notes = response.reverse();
    });
  }

  /** Listens to closeNote event issued by the note */
  @Listen('closeNote',{target: 'body'})
  async onCloseNote() {
    this.notes = (await getList()).reverse();
  }

  /** Listens to saveNote event issued by the note */
  @Listen('saveNote',{target: 'body'})
  async onSaveNote() {
    this.notes = (await getList()).reverse();
  }

  /** 
   * Sent when user selects a note by clicking on it
   * @event
   */
  @Event() selectedNote: EventEmitter;

  /**
   * Called by HTML table row when user clicks on the row
   * @param datatest - id used for testing
   * @param noteid - id of the note selected
   */
  onSelectNote(datatest: string, noteid: number) {
    //console.log(noteid);
    this.selectedNote.emit({'datatest':datatest,'noteid':noteid});
  }

  render() {
    //console.log(notes);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date/Time</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.notes.map( (note:any, index:number) =>
              <tr data-test={'note'+(index+1)} 
                onClick={() => this.onSelectNote('note'+(index+1),note.id)}>
                <td>{index+1}</td>
                <td>{dayjs(note.datetime)
                       .format('MMMM D, YYYY h:mm A')}</td>
                <td>{note.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}
