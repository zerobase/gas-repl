import * as Express from 'express';
import * as localtunnel from 'localtunnel';
import { spawn } from 'child_process';
import * as readlineSync from 'readline-sync';
import * as bodyParser from 'body-parser';


const port = 3000;

// express

const app = Express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post(
  '/',
  (req: Express.Request, res: Express.Response) => {
    console.log(req.body.result);
    return res.send(readlineSync.question("\n> "));
  }
);

app.listen(
  port,
  () => {
    console.log(`wozserver listening on port ${port}!`);
  }
);

// localtunnel

const tunnel = localtunnel(port, function(err, tunnel) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`localtunnel ${tunnel.url} is open.`);

  const clasp = spawn('clasp', ['run', 'repl', '-p', `["${tunnel.url}"]`]);

  clasp.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  clasp.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  clasp.on('close', (code) => {
    console.log(`clasp exited with code ${code}`);
    process.exit(0);
  });
});

tunnel.on('close', function() {
  console.log('localtunnel ${this.url} is closed.');
});

export default app;
