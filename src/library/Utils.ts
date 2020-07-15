/**
 * Contains utility functions
 * @packageDocumentation
 */

/**
 * Gets current date and time in ISO format
 * 
 * @returns date time in ISO string format
 */
export function getDateTime(): string {
    const date = new Date(Date.now());  // Use Date.now() to make code testable
    return date.toISOString();
  }

/**
 * Converts an array into an object with each property of the object
 * set to an array element.
 * 
 * @param array : array to convert into an object
 * @param key: defines which item in the array is to become the key
 * @returns object derived from the array
 */
export function array2Obj(array: any, key: string) {
  const initialValue = {};
  return array.reduce((obj: Object, item: any) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}
  