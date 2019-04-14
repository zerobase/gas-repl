import { spawn } from 'child_process';

export class GAS {
  start(tunnelURL: string): void {
    const clasp = spawn('clasp', ['run', 'GAS_REPL', '-p', `["${tunnelURL}"]`]);

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
  }
}
