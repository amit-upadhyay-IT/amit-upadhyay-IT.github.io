---
title: Intro to TCP Server
permalink: /docs/tcp-server/
---


<div class="note">
  <h5>TCP server</h5>
</div>

TCP server is one level below HTTP. It internally uses the `net` module. Sockets are used when we want to keep the connection alive. Any `http request` which happens in the connection is getting closed after the request is completed but a socket keeps it open and the streaming between the server and the client is more easy to do.

The process of setting up the TCP server is pretty straight forward using the `net` module.

Eg:
```js
var net = require('net');
var port = 1235;

net.createServer(function(socket) {
    console.log('A new client connected');

    socket.on('data', function(data) {
	console.log('Data received from client: '+data);
    });

    socket.on('close', function(data) {
	console.log('A client disconnected');
    });
});

net.listen(port, "localhost");

console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);
```

Note that while creating a HTTP server, in the callback function we had `request` and r`esponse` objects but here we have a `socket` object. The above example is a `simple TCP server` that is going to take up the data and display on the console.

The way sockets are different from typical request, response approach is that the **socket is the continuous stream flowing from the server to the client, they are in constant touch with each other**. The sockets opens the connection, they talk to it and then they send the data. It keeps on going till it gets a `close` event on the socket.
