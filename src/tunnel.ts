import * as localtunnel from 'localtunnel';
import {EventEmitter} from 'events';

export class Tunnel {
  private event;
  private clasp;
  private tunnel;
  private opened;

  constructor(event: EventEmitter, clasp) {
    this.event = event;
    this.clasp = clasp;
    this.opened = false;
  }

  start(port: number): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      this.tunnel = localtunnel(port, (err, tunnel) => {
        if (err) {
          reject(err);
        }
        setTimeout(() => {
          console.log(`localtunnel ${this.tunnel.url} is open.`);
          this.opened = true;
          resolve(this.tunnel), 3000
        }); // wait
      });

      this.tunnel.on('close', () => {
        if (this.opened) {
          this.opened = false;
          this.event.emit('exit', `localtunnel ${this.tunnel.url} is closed.`);
        }
      });

      this.tunnel.on('error', (error) => {
        this.event.emit('exit', `localtunnel error: ${error}.`);
      })
    });
  }

  close(): void {
    this.tunnel.close();
    this.opened = false;
  }
}
