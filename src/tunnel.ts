import * as localtunnel from 'localtunnel';
import {EventEmitter} from 'events';

export class Tunnel {
  private clasp;

  constructor(clasp) {
    this.clasp = clasp;
  }

  start(port: number): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      const tunnel = localtunnel(port, (err, tunnel) => {
        if (err) {
          reject(err);
        }
        console.log(`localtunnel ${tunnel.url} is open.`);
        resolve(tunnel);
      });

      tunnel.on('close', () => {
        console.log('localtunnel ${this.url} is closed.');
        this.clasp.kill();
        throw 'localtunnel is closed';
      });

      tunnel.on('error', (error) => {
        console.log(`localtunnel error: ${error}`);
        this.clasp.kill();
        throw error;
      })
    });
  }
}
