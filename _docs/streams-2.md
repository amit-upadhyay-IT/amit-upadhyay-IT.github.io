---
title: Streams part 2
permalink: /docs/streams-2/
---


## Another example on Streams

Here I am making a http server where I am asking client for uploading some file, and the putting the response (piping into the writeStream) into the `output` file.

# Example:

```js

var http = require('http'),
    fs = require('fs');

var server = http.createServer(function(req, res) {

    var url = req.url;
    var method = req.method;

    if (url == '/' && method == 'GET')// we are dispatching a page
    {
        var page = fs.readFileSync('upld.html');
        res.writeHead(200, { // writing this is important otherwise the html file content is going to be rendered as text/plain
            'Content-Type': 'text/html'
        });
        res.end(page);
    } else if (url == '/upload' && method == 'POST')
    {
        var writeStream = fs.createWriteStream('./output');

        // this pipes post data to the file
        req.pipe(writeStream);// whatever is there in request object we are going to pipe it in the writeStream
        req.on('end', function() {
            res.end('OK');
        });
    } else
    {
        res.end('Try loading http://localhost:8000');
    }

});

server.listen(8000);

console.log('server is connected at ', 8000);

```
