import * as Express from 'express';
import * as bodyParser from 'body-parser';
import {EventEmitter} from 'events';

export class Server {
  start(port: number): Promise<EventEmitter> {
    return new Promise((resolve, reject) => {
      const event = new EventEmitter;
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
          event.once('input', (input) => res.send(input.trim()));
          event.emit('result', req.body.result);
        }
      );

      express.listen(
        port,
        () => {
          console.log(`Express is listening on local port ${port}.`);
          resolve(event);
        }
      );
    });
  }
}
