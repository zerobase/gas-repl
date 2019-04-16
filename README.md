# gas-repl - Remote REPL for Google Apps Script (npm)

Interacting with remote objects gets your programming easier.

## Installation

```
npm install --save-dev gas-repl
```

## Prerequisite

Your GAS project should be set up for [`clasp run`](https://github.com/google/clasp/blob/master/docs/run.md).

## Usage

Put this global function to your project:

```
function GAS_REPL(tunnelURL) {
  var value = "START GAS-REPL";
  var exit = "exit";

  // prepare some objects
  var me = { name: 'hide', id: 'zerobase' };
  var url = ScriptApp.getService().getUrl();

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
      value = e
    }
  } while (value != exit);
}
```

Then execute `gas-repl` and interact with remote objects.
