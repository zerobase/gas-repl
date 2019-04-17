import * as ngrok from 'ngrok';
import {EventEmitter} from 'events';

export class Tunnel {
  private event;
  private clasp;
  private tunnel;
  private opened;

  constructor(event: EventEmitter) {
    this.event = event;
    this.tunnel = ngrok;
    this.opened = false;
  }

  start(port: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        var url = this.tunnel.connect({ addr: port, region: 'ap' });
        this.opened = true;
        resolve(url);
      }
      catch (e) {
        this.opened = false;
        this.event.emit('exit', `ngrok error: ${e}.`);
        reject(e);
      }
    });
  }

  close(): void {
    this.tunnel.disconnect()
    .then(() => this.opened = false)
    .then(() => this.tunnel.kill());
  }
}
