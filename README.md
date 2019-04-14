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
function repl(replUrl) {
  var value = "Start REPL";
  var exit = "EXITREPL";

  while(value != exit) {
    try {
      console.log(value);

      var fetchOptions = {
        'method': 'post',
        'contentType': 'application/json',
        'muteHttpExceptions': true,
        'payload': JSON.stringify({"result": value})
      };

      var response = UrlFetchApp.fetch(replUrl, fetchOptions);
      var expression = response.getContentText();
      value = eval(expression);
    }
    catch (e) {
      value = e
    }
  };
}
```
