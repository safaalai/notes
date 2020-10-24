/**
 * Contains utility functions
 * @packageDocumentation
 */

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
