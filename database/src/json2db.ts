import axios from 'axios';
import fs from 'fs';
import { defaultArgs } from 'puppeteer';

/** json2db takes a script file and operates on HarperDB */

// Set up DB parameters
const username = 'HDB_ADMIN';
const password = 'password';
const url = 'http://localhost:9925';

// Set up database script
const dbScriptPath = './scripts/' + 'sys-info' + '.json';
const dbScript = JSON.parse(fs.readFileSync(dbScriptPath).toString());

// Set up http configuration
const httpConfig = {
  headers: {
    "Content-Type":"application/json",
    "authorization": "Basic "
      + Buffer.from(username + ':' + password).toString('base64'),
    "cache-control":"no-cache"
  }
};

// Call the database
axios.post(url, dbScript, httpConfig)
  .then( (response) => { console.log(response.data); });
