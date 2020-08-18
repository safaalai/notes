import * as Utils from './Utils';

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
const objList = Utils.array2Obj(list,'id');

const text = JSON.parse(
  `[
    {"id":"1","text":"Text for my first note"},
    {"id":"2","text":"Text for my Second note"},
    {"id":"3","text":"Text for my Third note"},
    {"id":"4","text":"Text for my Fourth note"}
  ]`
);
const objText = Utils.array2Obj(text,'id');

/**
 * Returns list of all notes
 */
export function getList() : unknown {
  const arrayList = Object.values(objList);
  const clonedList = JSON.parse(JSON.stringify(arrayList));
  return(clonedList);
}

/**
 * Converts id to string and checks for validity
 * @param id id to convert to string
 * @throws Error if id is not valid
 */
function getCheckedId(id: string) : string {
  if( !(id in objList) )
    throw new Error("Note does not exist!");
  else
    return id;
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */
export function getNote(id: string) : unknown {
  const strId = getCheckedId(id);

  const note = objList[strId];
  const clonedNote = Object.assign({},note);
  clonedNote.text = objText[strId].text;
  return(clonedNote);
}

/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle : new title for the note
 * @param newText : editted text for the note
 */
export function saveNote(
  id: number, newTitle: string, newText: string) : unknown  {
  
  const note = objList[id.toString()];
  note.title = newTitle;

  const noteText = objText[id.toString()];
  noteText.text = newText;

  return true;
}

/**
 * Adds a blank note to the list
 * 
 * @returns id of the note created
 */
let idCount = 4;
export function addNote() : string {
  const newId = (++idCount).toString();
  objList[newId] = 
    { id: newId, 
      datetime: Utils.getDateTime(), 
      title: 'untitled'
    };
  
  objText[newId] = {id: newId, text: ''};
  return(newId);
}

/**
 * Deletes a note
 * @param id Id of note to be deleted
 */
export function deleteNote(id: string) : string {
  const checkedId = getCheckedId(id);
  delete objList[checkedId];
  delete objText[checkedId];

  return checkedId;
}
