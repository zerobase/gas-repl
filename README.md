# gas-repl - Remote REPL for Google Apps Script (npm)

Remote REPL (read–eval–print loop) for debugging Google Apps Script projects.

## Installation

```
npm install --save-dev gas-repl
```

## Prerequisite

Your GAS project should be set up for [`clasp run`](https://github.com/google/clasp/blob/master/docs/run.md).

## Usage

Put the global function below into your Google Apps Script project, then `gas-repl`:

```
function GAS_REPL(replURL) {
  var value = "Start REPL";
  var object = { name: 'hide', id: 'zerobase' };
  // add code here to prepare some objects

  while(true) {
    var response = UrlFetchApp.fetch(replURL,
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
  };
};
```
