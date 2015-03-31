var static = require('node-static');
var fileServer = new static.Server('./dist');

console.log('Server running at http://localhost:8080');
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (e, res) {
      if (e && (e.status === 404)) { // If the file wasn't found
        fileServer.serveFile('/index.html', 200, {}, request, response);
      }
    });
  }).resume();
}).listen(8080);
