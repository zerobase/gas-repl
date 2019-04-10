import * as Express from 'express';
import * as localtunnel from 'localtunnel';

const app = Express();
const port = 3000;

app.post(
  '/',
  (req: Express.Request, res: Express.Response) => {
    return res.send('Hello world.');
  }
);

app.listen(
  port,
  () => {
    console.log(`Example app listening on port ${port}!`);
  }
);

const tunnel = localtunnel(port, function(err, tunnel) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`localtunnel ${tunnel.url} is open.`)
  tunnel.url;
});

tunnel.on('close', function() {
  console.log('localtunnel ${this.url} is closed.')
});

export default app;
