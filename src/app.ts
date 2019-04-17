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
    this.clasp = new Clasp;
    this.tunnel = new Tunnel(this.clasp);
    this.gasRepl = new GasRepl(this.clasp);
  }

  start() {
    try {
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
    }
    catch (err) {
      if (/REPL Exit/.test(err)) {
        console.log('kill clasp 2');
        this.clasp.kill();
      }
      console.log(err);
      throw err;
    }
  }
}
