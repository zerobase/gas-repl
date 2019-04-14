import {Server} from './server';
import {Tunnel} from './tunnel';

export class App {
  start(port: number) {
    const server = new Server();
    server.start(port);

    const tunnel = new Tunnel();
    tunnel.start(port);
  }
}
