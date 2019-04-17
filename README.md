# gas-repl - Remote REPL for Google Apps Script (npm)

Interacting with remote objects gets your programming easier.

## Installation

```
npm install --save-dev gas-repl
```

## Prerequisite

Your GAS project should be set up for [`clasp run`](https://github.com/google/clasp/blob/master/docs/run.md). Follow the instruction below:

1. Find Project ID from <https://console.cloud.google.com/home/dashboard> and Script ID from <https://script.google.com/home/my>, then paste it into `.clasp.json`.
2. Open <https://console.developers.google.com/apis/credentials>, create an OAuth Client ID (Other), then download as `.claspcreds.json`.
3. `clasp login --creds .claspcreds.json`.
4. Put the following global function to your project.
5. Build your project and `clasp push`.
6. `clasp run GAS_REPL` will return `Hello from Apps Script ID: ******` if it is working right.
7. Now you can use `gas-repl` to interact with remote objects.

```
function GAS_REPL(tunnelURL) {
  if (tunnelURL === undefined) {
    return "Hello from Apps Script ID: " + ScriptApp.getScriptId();
  }

  var value = "START GAS-REPL";
  var exit = "exit";

  // prepare some objects
  var me = Session.getActiveUser().getUsername();
  //var app = initApp();

  do {
    try {
      var response = UrlFetchApp.fetch(
                       tunnelURL,
                       {
                         'method': 'post',
                         'contentType': 'application/json',
                         'payload': JSON.stringify({"result": value})
                       });
      var now = new Date();
      value = eval(response.getContentText());
    }
    catch (e) {
      console.log(e);
      if (/DNS error/.test(e) || /404/.test(e)) {
        throw 'REPL Connection Error';
      }
      value = e
    }
  } while (value != exit);
}
```
