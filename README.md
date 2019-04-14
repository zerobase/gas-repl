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
  var value = "Start REPL";

  // prepare some objects
  var me = { name: 'hide', id: 'zerobase' };
  var url = ScriptApp.getService().getUrl();

  do {
    var response = UrlFetchApp.fetch(
                     tunnelURL,
                     {
                       'method': 'post',
                       'contentType': 'application/json',
                       'payload': JSON.stringify({"result": value})
                     });
    try {
      value = eval(response.getContentText());
    }
    catch (e) {
      value = e
    }
  } while (response.getResponseCode() == 200);
};
```

Then execute `gas-repl` and interact with remote objects.
