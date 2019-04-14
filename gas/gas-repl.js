function repl(replURL) {
  var value = "Start REPL";
  var object = { name: 'hide', id: 'zerobase' };
  // add code here to prepare some objects

  while(true) {
    var response = UrlFetchApp.fetch(replURL,
                     {
                       'method': 'post',
                       'contentType': 'application/json',
                       //'muteHttpExceptions': true,
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
