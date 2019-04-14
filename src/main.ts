import {App} from './app';
import * as getPort from 'get-port';

const promise = new Promise((resolve, reject) => {
  resolve(getPort());
});
promise.then((port) => {
  const app = new App();
  app.start(port);
});
