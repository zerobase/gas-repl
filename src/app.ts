import {Server} from './server';
import {Tunnel} from './tunnel';
import {GAS} from './gas';
import {REPL} from './repl';
import * as getPort from 'get-port';

export class App {
  private server;
  private tunnel;
  private gas;
  private repl;

  constructor() {
    this.server = new Server;
    this.tunnel = new Tunnel;
    this.gas    = new GAS;
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
          .then(repl => this.gas.start(tunnel.url))
        });
      });
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
  }
}
