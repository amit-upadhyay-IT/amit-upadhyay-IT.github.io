---
title: Intro to HTTP Server
permalink: /docs/http-server/
---


<div class="note">
  <h5>HTTP server</h5>
  <p>
    <code>http</code> is a core module of nodejs. It has <code>createServer</code> method which is asynchronous. It takes a callback function which has a request and response object (typically with any http server).
  </p>
</div>


#### Example:

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


<div class="note info">
  <h5>Try to see what all things the <code>request</code> object contains.</h5>
  <p>
    Just do a <code>console.log(request);</code>
  </p>
</div>



A lot more is there about `http` module, later you may find a details post about `http` core module containing its `objects`, `methods` and `applications` in a networking app of Node.js
