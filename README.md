# gas-repl - Remote REPL for Google Apps Script (npm)

Interacting with remote objects gets your programming easier.

[![Image from Gyazo](https://i.gyazo.com/2958460c431c85ccaeb51a24f08240e2.gif)](https://gyazo.com/2958460c431c85ccaeb51a24f08240e2)

## Installation

```
npm install --save-dev gas-repl
```

## Prerequisite

Your GAS project should be set up for [`clasp run`](https://github.com/google/clasp/blob/master/docs/run.md). Follow the instruction below:

1. Find Project ID from <https://console.cloud.google.com/home/dashboard> and Script ID from <https://script.google.com/home/my>, then paste it into `.clasp.json`.
2. Open <https://console.developers.google.com/apis/credentials>, create an OAuth Client ID (Other), then download as `.claspcreds.json`.
3. `clasp login --creds .claspcreds.json`.
4. Put the global function of `gas-repl -p` to your project.
5. Build your project and `clasp push`.
6. `clasp run GAS_REPL` will return `Hello from Apps Script ID: ******` if it is working right.

Now you can use `gas-repl` to interact with remote objects.

## Troubleshooting

If you have `Exception: ScriptError Authorization is required to perform that action. []`, try `clasp login`.
