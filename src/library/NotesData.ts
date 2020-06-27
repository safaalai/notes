/**
 * Data library for Notes
 * @packageDocumentation
 */
/**
 * @ignore
 */
const list = 
  `[
    {"id":"1","datetime":"2020-03-01T10:10Z","title":"My First Note"},
    {"id":"2","datetime":"2020-03-02T11:11Z","title":"My Second Note"},
    {"id":"3","datetime":"2020-03-03T12:12Z","title":"My Third Note"},
    {"id":"4","datetime":"2020-03-04T13:13Z","title":"My Fourth Note"}
  ]`;

/**
 * Returns list of all notes
 */
export function getList() {
    return(JSON.parse(list));
}
