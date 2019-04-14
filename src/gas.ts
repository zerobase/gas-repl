import {spawn} from 'child_process';
import {EventEmitter} from 'events';

export class GAS {
  start(tunnelURL: string): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      const clasp = spawn('clasp', ['run', 'GAS_REPL', '-p', `["${tunnelURL}"]`]);

      clasp.stdout.on('data', (data) => {
        console.log(`${data}`);
      });

      clasp.stderr.on('data', (data) => {
        console.log(`${data}`);
      });

      clasp.on('close', (code) => {
        console.log(`clasp exited with code ${code}`);
        throw 'clasp exited'
      });

      clasp.on('error', (error) => {
        console.log(`clasp error: ${error}`);
        throw error;
      });

      resolve(clasp);
    })
  }
}
