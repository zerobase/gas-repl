import * as repl from 'repl';
import {EventEmitter} from 'events';

export class GasRepl {
  private clasp;
  private event: EventEmitter;

  constructor(event: EventEmitter, clasp) {
    this.event = event;
    this.clasp = clasp;
  }

  start(): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      //event.once('result', (result) => { /* ignore the first */});
      const replServer = repl.start({
        prompt: '> ',
        eval: (cmd, context, filename, callback) => {
<<<<<<< HEAD
          event.once('result', (result) => callback(null, result));
          event.emit('input', cmd.trim());
=======
          this.event.emit('input', cmd.trim());
          this.event.once('result', (result) => callback(null, result));
>>>>>>> e3402d2... Ensure localtunnel close at exit
        }
      });
      replServer.setupHistory('.gas-repl.history', (err, repl) => {});
      replServer.on('exit', () => {
        this.event.emit('exit', 'REPL exit.')
      });
      resolve(replServer);
    });
  }
}
