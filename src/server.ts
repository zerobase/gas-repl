import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as readlineSync from 'readline-sync';

export class Server {
  start(port: number): void {
    const express = Express();
    express.use(bodyParser.urlencoded({ extended: true }))
    express.use(bodyParser.json())

    express.post(
      '/',
      (req: Express.Request, res: Express.Response) => {
        console.log(req.body.result);
        return res.send(readlineSync.question("\n> "));
      }
    );

    express.listen(
      port,
      () => {
        console.log(`gas-repl is listening on local port ${port}.`);
      }
    );
  }
}
