import {spawn} from 'child_process';
import {EventEmitter} from 'events';

export class Clasp {
  private process;

  start(tunnelURL: string): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      this.process = spawn('clasp', ['run', 'GAS_REPL', '-p', `["${tunnelURL}"]`]);

      this.process.stdout.on('data', (data) => {
        console.log(`${data}`);
      });

      this.process.stderr.on('data', (data) => {
        console.log(`${data}`);
      });

      this.process.on('close', (code) => {
        console.log(`clasp exited with code ${code}`);
        throw 'clasp exited'
      });

      this.process.on('error', (error) => {
        console.log(`clasp error: ${error}`);
        throw error;
      });

      resolve(this.process);
    })
  }

  kill(): void {
    this.process.kill();
  }
}
