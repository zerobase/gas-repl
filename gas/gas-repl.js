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
