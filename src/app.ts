import {Server} from './server';
import {Tunnel} from './tunnel';
import {Clasp} from './clasp';
import {GasRepl} from './gas-repl';
import * as getPort from 'get-port';

export class App {
  private server;
  private tunnel;
  private clasp;
  private gasRepl;

  constructor() {
    this.server = new Server;
    this.tunnel = new Tunnel;
    this.clasp = new Clasp;
    this.gasRepl = new GasRepl;
  }

  start() {
    getPort()
    .then(port => {
      this.server.start(port)
      .then(event => {
        this.tunnel.start(port)
        .then(tunnel => {
          this.gasRepl.start(event)
          .then(repl => this.clasp.start(tunnel.url))
        });
      });
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
  }
}
