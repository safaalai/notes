import axios from 'axios';
import fs from 'fs';
import argv from 'minimist';
import chalk from 'chalk';

/** json2db takes a script file and operates on HarperDB 
 * Command line arguments:
 * --target=<target environment>
 * --script=<script to run - an array of database commands>
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

// Set up database script & check it is an array
const dbScriptPath = './scripts/' + args.script + '.json';
const dbScript = JSON.parse(fs.readFileSync(dbScriptPath).toString());
if(!Array.isArray(dbScript)) {
  console.log('JSON Script must be an array!');
  console.log('Enclose JSON in square "[]" brackets.');
  process.exit(0);
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

// Loop through the array of scripts
const runScript = async () => {
  await asyncLoop(dbScript, async (script, index) => {
    console.log(chalk.red.bold('RUNNING: ' + (index+1)));
    console.log(JSON.stringify(script,null,2));
    const response = await axios.post(url, script, httpConfig);
    console.log(chalk.red.bold('RESPONSE:'));
    console.log(JSON.stringify(response.data, null, 2));
  });
  console.log(chalk.red.bold('DONE!'));
}
runScript();

// Async looper
interface LooperCallBack {
  (script: unknown, index:number): Promise<void>;
}
async function asyncLoop(scripts : Array<unknown>, callback: LooperCallBack) {
  for (let index=0; index<scripts.length; ++index)
    await callback(scripts[index], index);
}

// Call the database
//axios.post(url, dbScript, httpConfig)
//  .then( (response) => { console.log(response.data); });
