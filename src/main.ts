import {App} from './app';
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';

program
  .version('1.3.1')
  .option('-p, --print', 'Print the source to add to your project')
  .parse(process.argv);

if (program.print) {
  console.log(fs.readFileSync(path.resolve(__dirname + '/../gas/gas-repl.js'), 'utf8'));
  process.exit();
}

const app = new App();
app.start();
