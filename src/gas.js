global.repl = function (replUrl) {
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
};
