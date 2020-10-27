import * as Utils from './Utils';

// Get database object
const db = new Utils.DBConnect();

/**
 * Data library for Notes
 * @packageDocumentation
 */

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
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */
export interface note {
  id: string,
  datetime: number,
  title: string,
  text: string
}
export async function getNote(id: string) : Promise<note> {
  const response = <note[]> await db.send({
    "operation":"sql",
    "sql":`
      SELECT id,__createdtime__ AS datetime,title,text
      FROM notes.notes
      WHERE id='${id}'
    `
  });
  //console.log(`getNote( ${id} ) response:\n`+JSON.stringify(response,null,2));
  if(response.length == 0)
    throw new Error('No such note!');
  else
    return(response[0]);
}

/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle : new title for the note
 * @param newText : editted text for the note
 */
interface updateResponse {
  message: string,
  skipped_hashes: Array<string>,
  update_hashes: Array<string>
}
export async function saveNote(
  id: string, newTitle: string, newText: string) : Promise<string>  {

  const response = <updateResponse> await db.send({
    "operation":"sql",
    "sql":`
      UPDATE notes.notes
      SET title = '${newTitle}', text='${newText}'
      WHERE id = '${id}'
    `
  });

  if(response.update_hashes.length == 1)
    return response.update_hashes[0];
  else
    throw new Error('Note does not exist!');
}

/**
 * Adds a blank note to the list
 * 
 * @returns id of the note created
 */
interface insertResponse {
  message: string,
  skipped_hashes: Array<string>,
  inserted_hashes: Array<string>
}
export async function addNote() : Promise<string> {
  const response = <insertResponse> await db.send({
    "operation":"sql",
    "sql":`
      INSERT INTO notes.notes (title,text)
      VALUES('untitled','')
    `
  });

  if(response.inserted_hashes.length == 1)
    return response.inserted_hashes[0];
  else
    throw new Error('Failed to create note!');
}

/**
 * Deletes a note
 * @param id Id of note to be deleted
 */
interface deleteResponse {
  message: string,
  skipped_hashes: Array<string>,
  deleted_hashes: Array<string>
}
export async function deleteNote(id: string) : Promise<string> {
  const response = <deleteResponse> await db.send({
    "operation":"sql",
    "sql":`
      DELETE FROM notes.notes
      WHERE id='${id}'
    `
  });

  if(response.deleted_hashes.length == 1)
    return response.deleted_hashes[0];
  else
    throw new Error('Failed to delete note!');
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
  //let response = 
  await db.send({
    "operation":"sql",
    "sql":"DELETE FROM notes.notes"
  });
  //console.log(response);

  // Add test records
  for(let i=0; i<dbResetData.length; ++i) {
    //response = 
    await db.send({
      "operation":"sql",
      "sql":`
        INSERT INTO notes.notes (title,text)
        VALUES('${dbResetData[i].title}','${dbResetData[i].text}')
      `
    });
    //console.log(response);
  }
}
