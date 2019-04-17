import {spawn} from 'child_process';
import {EventEmitter} from 'events';

export class Clasp {
  private process;
  private event: EventEmitter;

  constructor(event: EventEmitter) {
    this.event = event;
  }

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
        this.event.emit('exit', `clasp exited with code ${code}.`);
      });

      this.process.on('error', (error) => {
        this.event.emit('exit', `clasp error: ${error}.`);
      });

      resolve(this.process);
    })
  }

  kill(): void {
    this.process.kill();
  }
}
