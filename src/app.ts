import {Server} from './server';
import {Tunnel} from './tunnel';

export class App {
  start(options) {
    const server = new Server();
    server.start(options.port);

    const tunnel = new Tunnel();
    tunnel.start(options.port);
  }
}
