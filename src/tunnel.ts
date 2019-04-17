import * as ngrok from 'ngrok';
import {EventEmitter} from 'events';

export class Tunnel {
  private event;
  private tunnel;

  constructor(event: EventEmitter) {
    this.event = event;
    this.tunnel = ngrok;
  }

  start(port: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        var url = this.tunnel.connect({ addr: port });
        resolve(url);
      }
      catch (e) {
        this.event.emit('exit', `ngrok error: ${e}.`);
        reject(e);
      }
    });
  }

  close(): void {
    this.tunnel.disconnect()
    .then(() => this.tunnel.kill());
  }
}
