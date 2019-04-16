import {Server} from './server';
import {Tunnel} from './tunnel';
import {Clasp} from './clasp';
import {REPL} from './repl';
import * as getPort from 'get-port';

export class App {
  private server;
  private tunnel;
  private clasp;
  private repl;

  constructor() {
    this.server = new Server;
    this.tunnel = new Tunnel;
    this.clasp    = new Clasp;
    this.repl   = new REPL;
  }

  start() {
    getPort()
    .then(port => {
      this.server.start(port)
      .then(event => {
        this.tunnel.start(port)
        .then(tunnel => {
          this.repl.start(event)
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
