import {Server} from './server';
import {Tunnel} from './tunnel';
import {Clasp} from './clasp';
import {GasRepl} from './gas-repl';
import * as getPort from 'get-port';
import {EventEmitter} from 'events';

export class App {
  private event;
  private server;
  private tunnel;
  private clasp;
  private gasRepl;

  constructor() {
    this.event = new EventEmitter;
    this.server = new Server(this.event);
    this.clasp = new Clasp(this.event);
    this.tunnel = new Tunnel(this.event);
    this.gasRepl = new GasRepl(this.event, this.clasp);
  }

  start() {
    getPort()
      .then(port => {
        this.server.start(port);
        return this.tunnel.start(port);
      })
      .then(tunnelUrl => this.clasp.start(tunnelUrl))
      .then(() => this.gasRepl.start());
    console.log('Press Enter, then try `now` or whatever you like.');
    this.event.on('exit', (msg) => {
      console.log(msg);
      this.clasp.kill();
      this.tunnel.close();
      process.exit();
    });
  }
}
