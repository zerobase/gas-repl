// Put the following global function to your project.
function GAS_REPL(tunnelURL) {
  var hello = "Hello from Apps Script ID: " + ScriptApp.getScriptId();
  if (tunnelURL === undefined) {
    return hello;
  }
  function inspect(object) {
    return Object.keys(object).sort().map(
      (function(k){
        return typeof object[k] + " [" + k + "] = " + object[k];
      }));
  }
  var value = "START GAS-REPL";

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
  } while (true);
}
