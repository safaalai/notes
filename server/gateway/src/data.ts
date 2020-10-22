import * as Utils from './Utils';

// Get database object
const db = new Utils.DBConnect();

/**
 * Data library for Notes
 * @packageDocumentation
 */
/**
 * @ignore
 */
const listDefault =   `[
  {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
  {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
  {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
  {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
]`;

const list = JSON.parse(listDefault);
const objList = Utils.array2Obj(list,'id');

const textDefault =   `[
  {"id":"1","text":"Text for my first note"},
  {"id":"2","text":"Text for my Second note"},
  {"id":"3","text":"Text for my Third note"},
  {"id":"4","text":"Text for my Fourth note"}
]`;
const text = JSON.parse(textDefault);
const objText = Utils.array2Obj(text,'id');

/**
 * Returns list of all notes
 * 
 * @returns array of noteListItem
 */
export interface noteListItem {
  id: string,
  datetime: number,
  title: string
}
export async function getList() : Promise<noteListItem[]> {
  const response = await db.send({
    "operation":"sql",
    "sql":`
      SELECT id,__createdtime__ AS datetime,title
      FROM notes.notes
      ORDER BY datetime
    `
  });
  return(<noteListItem[]>response);
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
  id: string, newTitle: string, newText: string) : string  {

  const checkedId = getCheckedId(id);

  const note = objList[checkedId.toString()];
  note.title = newTitle;

  const noteText = objText[checkedId.toString()];
  noteText.text = newText;

  return id;
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

/** Resets dummy data to known state */
const dbResetData = JSON.parse(`[
  {"title":"My First Note","text":"Text for my first note"},
  {"title":"My Second Note","text":"Text for my second note"},
  {"title":"My Third Note","text":"Text for my third note"},
  {"title":"My Fourth Note","text":"Text for my fourth note"}
]`);

export async function reset() : Promise<void> {
  // Delete all records in notes table
  let response = await db.send({
    "operation":"sql",
    "sql":"DELETE FROM notes.notes"
  });
  //console.log(response);

  // Add test records
  for(let i=0; i<dbResetData.length; ++i) {
    response = await db.send({
      "operation":"sql",
      "sql":`
        INSERT INTO notes.notes (title,text)
        VALUES('${dbResetData[i].title}','${dbResetData[i].text}')
      `
    });
    //console.log(response);
  }
}
