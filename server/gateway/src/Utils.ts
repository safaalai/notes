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
export function array2Obj(
  array: Array<Record<string,string>>, key: string) 
  : Record<string,Record<string,string>> {
  const initialValue = {};
  return array.reduce(
    (obj: Record<string,Record<string,string>>, item: Record<string,string>) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}

/**
 * Class DBConnect
 * Connects to the Database
 * 
 * Supply username, password & db url via environment variables
 */
import axios from 'axios';
export class DBConnect {
  username: string;
  password: string;
  url: string;

  constructor() {
    this.username = process.env.dbUsername;
    this.password = process.env.dbPassword;
    this.url = process.env.dbUrl;
  }

  /** Returns httpConfig needed by axios */
  getHttpConfig() : unknown {
    const credentials = this.username + ':' + this.password;
    const auth = "Basic " + Buffer.from(credentials).toString('base64');
    const httpConfig = {
      headers: {
        "Content-Type":"application/json",
        "authorization": auth,
        "cache-control":"no-cache"
      }
    };
    return( httpConfig );
  }

  /** send function sends http post to database */
  async send(query: unknown) : Promise<unknown> {
    const httpConfig = this.getHttpConfig();
    const response = await axios.post(this.url, query, httpConfig);
    return( response.data );
  }
}
