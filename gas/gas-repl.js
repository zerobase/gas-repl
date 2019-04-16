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
};
