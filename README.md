# wozserver - Human-backed Web server (Wizard of Oz method)

A web server that exposes itself to the world with [localtunnel](https://localtunnel.github.io/www/). The HTTP response is written in hand. Yeah, you type the response on demand, just in time.

Meant to be used for remote REPL (read–eval–print loop) backdoor for debugging Google Apps Script projects.

## Installation

```
npm install --save-dev wozserver
```

## Prerequisite

Check the instruction of `[clasp run](https://github.com/google/clasp/blob/master/docs/run.md)`.

## Usage

Put this global function into your Google Apps Script project:

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

Run `wozserver` and enjoy REPL.

If it does not work, modifying the first line to `global.repl = function (replUrl) {` may work. Note that this has to be a global function.
