import {App} from './app';
import * as program from 'commander';
var package_json = require('../package.json');

const VERSION = package_json.version;

program
  .version(VERSION, '-v, --version')
  .option('-P, --port <port>', 'local port number [3000]', 3000)
  .parse(process.argv)

const app = new App();
app.start({
  port: program.port
});
