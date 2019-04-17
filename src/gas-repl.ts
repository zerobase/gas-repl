import * as repl from 'repl';
import {EventEmitter} from 'events';

export class GasRepl {
  private clasp;

  constructor(clasp) {
    this.clasp = clasp;
  }

  start(event: EventEmitter): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      //event.once('result', (result) => { /* ignore the first */});
      const replServer = repl.start({
        prompt: '> ',
        eval: (cmd, context, filename, callback) => {
          event.once('result', (result) => callback(null, result));
          event.emit('input', cmd.trim());
        }
      });
      replServer.setupHistory('.gas-repl.history', (err, repl) => {});
      replServer.on('exit', () => {
        this.clasp.kill();
        process.exit();
      });
      resolve(replServer);
    });
  }
}
