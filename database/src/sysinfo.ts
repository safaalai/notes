import axios from 'axios';

/** sysinfo from HarperDB */
console.log('hello database');

// Set up DB parameters
const username = 'HDB_ADMIN';
const password = 'password';
const url = 'http://localhost:9925';

// Set up database script
const dbScript = {
  "operation":"system_information"
}

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
