global.repl = function(replUrl) {
  var replValue = "Start REPL";
  do {
    var replOptions = {
      'method': 'post',
      'muteHttpExceptions': true,
      'payload': JSON.stringify(replValue, null, "\t")
    };
    var replResponse = UrlFetchApp.fetch(replUrl, replOptions);
    try { console.log(replValue = eval(replResponse.getContentText())); }
    catch (e) { console.log(replValue = e); }
  } while (replResponse.getResponseCode() == 200);
}
