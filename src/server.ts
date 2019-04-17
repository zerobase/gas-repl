import * as Express from 'express';
import * as bodyParser from 'body-parser';
import {EventEmitter} from 'events';

export class Server {
  private event: EventEmitter;

  constructor(event: EventEmitter) {
    this.event = event;
  }

  start(port: number): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      const express = Express();
      express.use(bodyParser.urlencoded({ extended: true }));
      express.use(bodyParser.json());
      express.use((err, req, res, next) => {
        console.log(`Express error: ${err}`);
        res.sendStatus(500);
        res.send(err);
        throw err;
      });

      express.post(
        '/',
        async (req: Express.Request, res: Express.Response) => {
          let result = req.body.result;
          this.event.once('input', (input) => res.send(input.trim()));
          this.event.emit('result', result);
        }
      );

      express.listen(port, () => resolve(express));
    });
  }
}
