---
title: Detailed HTTP
permalink: /docs/detailed-http/
---


<div class="note">
  <h5>HTTP server</h5>
</div>

`http` is a core module of nodejs. It has `createServer` method which is asynchronous. It takes a callback function which has a request and response object (typically with any http server).

Eg:

```js
var http = require('http'),
port = 1234;

var server = http.createServer(function(request, response) {
    response.writeHeader(200, 
		{"Content-Type": "text/plain"}
	);
    response.write("Hello HTTP!");
    response.end();
});

server.listen(port);
```

Once we get the request we write header to the response, then write some message and at the end we end it.
Try to see what all things request object contains.

#### 3 main objects to deal with when creating a HTTP server.
- Server Object: an EventEmitter
- ServerResponse object: A Writable Stream
- IncomingMessage object: A Readable Stream

#### Server object has many Events and Methods, some of which are   listed below:
- `request`: emitted when there is an incoming request. The callback takes two arguments: request- A client request object and response- A server response object.
- `connection`: When a new TCP stream is established. The callback takes socket as an argument.
- `close`: emitted when the server closes.
- `listen()`: Similar to the TCO server.listen() function
- `close()`: stops server from receiving new connections.

The server Response object is created internally and not by the user. It is passed as the second argument to the "request" event callback. It is a Writable Stream.

#### A few important methods of this object:

- `writeHead(statusCode[, statusMessage][, headers])`: statusCode is the HTTP status code, statusMessage is an optional status message that can be sent, headers is a literal object containing the HTTP headers with values. Note that this must be called only once on a message and must be called before end(). If you can write() or end() before this, the writeHead() will automatically be called.
- `write(), end()`: Similar to the write() and end() of the Writable Stream.
- Since it is a Writable stream: you can pipe anything- even a Movie~ Just make sure the Content-Type header is set accordingly.

But if you encapsulate this on top of express kind of a web management framework, we need not worry about that, most of the time there are autodetection which runs in the background, which detect the type of the file using pom (pipe order mark) the encoding type.

IncomingMessage is a Readable Stream object that is created by the Server object and passed as the first argument to the "request" event callback.

You can look at a list of request/response headers or rawHeaders property of the object.

The method property has the HTTP method that was used to send the request: POST, GET, PUT, DELETE, etc. The url property has the request URL string. The URL that is present in the HTTP request.

At a high lever you are mostly going to use the 'http' module, you would very rarely end up using a 'net' module or 'tls' module.

---------------------------------------------------------------
- In a "real-world" application though, we would need a parser to parse the body of the request.
- Listen to the 'data' event of this IncomingMessage Readable stream and it is evident that it is not practical. However this would suffice for a static file server.


### Making request to another domain (server) and pipe that response to our server's response

```js
var http = require ('http');

var server = http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    var urll = 'http://minimumstack.com'
    http.get(urll, function (response) {
        response.pipe(res);
    }).on('error', function (err) {
        res.write(new Error ('Oops !'));// writing to response of our server, not to the response object sent from the url where we are doing get request
        res.writeHead(500, {
            "Content-Type": "text/plain"
        });
        res.end('Something');
    });
});

server.listen('3000');
console.log('Server is listening');
```

The above is another application of using the `'http'` module, not only to create a server but also to work with other hosts.

Typically to work with other services like the above(i.e. to get the data from other servers) generally we use another node modules called as `'request'`.

Example:

```js
/*
 * this is an example of request stand alone, we can even integrate it with out existing http server
 *
 * The request module consists of all the thing we need to make these request
 * */

var request = require('request');
request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
```

The `request` module takes care of making the request on your behalf and sending that to the client.

Example

```js
var http = require('http');
var request = require('request');

var server = http.createServer(function (req, res) {

    request('http://www.google.com', function (error, response, body) {
        console.log(body);
        if (!error && response.statusCode == 200) {
            res.write(body);
            res.writeHead(500, {
                "Content-Tpye": "text/plain"
            });
            res.end();
        }
    });
});

server.listen(3000);
console.log('Server is listening');
```

### Reading POST data using http

```js
var http = require('http');
var postHTML = 
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(8080);
console.log('Server is listening to post 3000');
```
