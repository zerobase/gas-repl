import * as Express from 'express';
import * as localtunnel from 'localtunnel';
import { spawn } from 'child_process';

const port = 3000;

// express

const app = Express();

app.post(
  '/',
  (req: Express.Request, res: Express.Response) => {
    return res.send('[1,2,3].join("+")');
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
    console.log(`clasp stdout: ${data}`);
  });

  clasp.stderr.on('data', (data) => {
    console.log(`clasp stderr: ${data}`);
  });

  clasp.on('close', (code) => {
    console.log(`clasp exited with code ${code}`);
  });
});

tunnel.on('close', function() {
  console.log('localtunnel ${this.url} is closed.');
});

export default app;
