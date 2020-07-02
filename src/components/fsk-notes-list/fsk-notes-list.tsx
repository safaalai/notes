import { Component, ComponentInterface, h, Event } from '@stencil/core';
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
  /** 
   * Sent when user selects a note by clicking on it
   * @event
   */
  @Event() selectedNote: EventEmitter;

  /**
   * Called by HTML table row when user clicks on the row
   * @param noteid - id of the note selected
   */
  onSelectNote(noteid: number) {
    //console.log(noteid);
    this.selectedNote.emit(noteid);
  }

  render() {
    const notes = getList().reverse();
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
            {notes.map( (note:any, index:number) =>
              <tr id={'note'+note.id} onClick={() => this.onSelectNote(note.id)}>
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
