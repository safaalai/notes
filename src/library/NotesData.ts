/**
 * Data library for Notes
 * @packageDocumentation
 */
/**
 * @ignore
 */
const list = JSON.parse(
  `[
    {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
    {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
    {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
    {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
  ]`
);

const text = JSON.parse(
  `[
    {"id":"1","text":"Text for my first note"},
    {"id":"2","text":"Text for my Second note"},
    {"id":"3","text":"Text for my Third note"},
    {"id":"4","text":"Text for my Fourth note"}
  ]`
);

/**
 * Returns list of all notes
 */
export function getList() {
  const clonedList = JSON.parse(JSON.stringify(list));
  return(clonedList);
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */
export function getNote(id: number) {
  const note = list[id-1];
  const clonedNote = Object.assign({},note);
  clonedNote.text = text[id-1].text;
  return(clonedNote);
}

/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle : new title for the note
 * @param newText : editted text for the note
 */
export function saveNote(id: number, newTitle: string, newText: string) {
  const note = list[id-1];
  note.title = newTitle;

  const noteText = text[id-1];
  noteText.text = newText;
}

/**
 * Adds a blank note to the list
 * 
 * @returns id of the note created
 */
export function addNote() : number {
  const id = list.length + 1;
  list.push({id: id.toString(), datetime: getDateTime(), title: 'untitled'});
  text.push({id: id.toString(), text: ''});
  return(id);
}

/**
 * Gets current date and time in ISO format
 * 
 * @returns date time in ISO string format
 */
export function getDateTime(): string {
  const date = new Date(Date.now());  // Use Date.now() to make code testable
  return date.toISOString();
}
