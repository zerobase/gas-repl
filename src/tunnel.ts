import * as localtunnel from 'localtunnel';
import {GAS} from './gas';

export class Tunnel {
  start(port: number) {
    const tunnel = localtunnel(port, function(err, tunnel) {
      if (err) {
        throw err;
      }
      console.log(`localtunnel ${tunnel.url} is open.`);

      const gas = new GAS();
      gas.start(tunnel.url);
    });

    tunnel.on('close', function() {
      console.log('localtunnel ${this.url} is closed.');
    });
  }
}
