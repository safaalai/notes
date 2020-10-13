import axios from 'axios';
import argv from 'minimist';
import * as utils from './utils';

/** Describe
 * Expect two Arguments:
 * --target=<target environment in config file> (mandatory)
 * --schema=<target schema> (optional)
 * --table=<target table> (optional)
 * 
 * If neither schema or table are specified will do describe_all
 * If only schema is specified will do describe_schema
 * If both schema and table are specified will do describe_table
 * If only --table is specified will throw an error
*/

// Get & check command line arguments
const args = argv(process.argv.slice(2));
if( !('target' in args) ) {
  console.log(`usage: describe --target=<target environment>
    [--schema=<schema>] [--table=<table>]`);
  console.log(' (required) target = db target in dbconfig.json file.');
  console.log(' (optional) schema = run describe_schema with given schema.');
  console.log(' (optional) table = run describe_table with given table.');
  console.log(' If neither schema or table is specified, run describe_all');
  console.log(' If table is specified, schema must also be specfied.');
  process.exit();
}

// Setup config parameters
const targetConfig = utils.getDBConfig(args.target);
const httpConfig = utils.getHttpConfig(targetConfig);
const url = targetConfig.url;

// Set up database script & check it is an array
const dbScript = getScript(args);

// Loop through the array of scripts
const runScript = async () => {
  const response = await axios.post(url, dbScript, httpConfig);
  console.log(JSON.stringify(response.data, null, 2));
}
runScript();

// get the Describe script according to command line arguments
function getScript(args: Record<string,string>) : Record<string,string> {
  if('table' in args)
    return({
      "operation":"describe_table",
      "schema":args.schema,
      "table":args.table
    });
  else if('schema' in args)
    return({
      "operation":"describe_schema",
      "schema":args.schema
    });
  else
    return({"operation":"describe_all"});
}
