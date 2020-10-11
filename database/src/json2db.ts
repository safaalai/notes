import axios from 'axios';
import fs from 'fs';
import argv from 'minimist';

/** json2db takes a script file and operates on HarperDB 
 * Command line arguments:
 * --target=<target environment>
 * --script=<script to run>
 * 
 * Must have specified dbConfig.json
*/

// Get & check command line arguments
const args = argv(process.argv.slice(2));
if(!('target' in args) || !('script' in args)) {
  console.log('usage: json2db --target=<target> --script=<dbScript>');
  console.log('  target= db target in config file');
  console.log('  script= JSON script file in scripts folder');
  process.exit(0);
}
console.log(args);

// Get dbConfig
const configPath = './dbconfig.json';
const config = JSON.parse(fs.readFileSync(configPath).toString());
const targetConfig = config[args.target];
console.log(targetConfig);

// Set up DB parameters
const username = targetConfig.username;
const password = targetConfig.password;
const url = targetConfig.url;

// Set up database script
const dbScriptPath = './scripts/' + args.script + '.json';
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
