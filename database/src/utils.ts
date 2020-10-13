import fs from 'fs';

/** Utility functions for Database processors
*/

const configPath = './dbconfig.json';
/** Returns Database configuration
 * @param target: environment to return config for
 * 
 * @returns iDBConfig
 */
export interface iDBConfig {
  username: string;
  password: string;
  url: string;
}
export function getDBConfig(target: string) : iDBConfig {
  const config = JSON.parse(fs.readFileSync(configPath).toString());
  return config[target];
}

/** Returns httpConfig needed by axios 
 * @param config: database configuration
 * 
 * @returns httpConfig
*/
export function getHttpConfig(config: iDBConfig) : unknown {
  const credentials = config.username + ':' + config.password;
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
