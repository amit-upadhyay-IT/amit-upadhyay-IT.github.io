---
title: TCP server-client
permalink: /docs/tcp-server-client/
---


<div class="note">
  <h4>Network Communication - TCP</h4>
</div>


For network communication on Node.js, we use `net` module. The protocols which are quite important in regards of Nodejs are `TCP` and `UDP` where HTTP uses TCP. So at a high level HTTP implementation at a low level  TCP and UDP implementation.

```js

net.createServer([options][,callback]);

// options object
{
    allowHalfOpen : false, pauseOnConnect : false
}
// values: true or false, default: false

```

- If `allowHalfOpen` is true then the other side initiates connection termination the server will not send the `FIN` packet.
- The socket becomes non-readable but not writable. You must call the `end()` function explicitly.

- If `pauseOnConnect` is `true`, then the socket associated with each incoming connection is paused, no data transmitted from its handle until `resume()` is called on it.
- The last argument `callback`, automatically works as the callback function for the `connection` event.

### TCP server object:
Server has the following properties, events and methods

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Methods</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>listen(port<br>[, host],<br>[, backlog]<br>[, callback]):</code></p></td>
      <td><p>

This method makes the TCP server begin accepting connections on the specified PORT and HOST.
- If <code>HOST</code> is omitted, server will accept connections to any <code>IPv4</code> address and if PORT is 0, then random port is chosen. Once this method is called, the <code>listening</code> event is emitted.
- The callback argument automatically works like the callback for the <code>listen</code> event.
- <code>Backlog</code> is the max length of the queue of pending connection <code>(default: 511)</code> : ultimately decided by the OS.

      </p></td>
    </tr>
    <tr>
      <td><p><code>close([cb])</code></p></td>
      <td><p>

        Stops server from accepting new connections but keeps existing connections till they are terminated. The callback passed becomes the listener for the <code>close</code> event.
      </p></td>
    </tr>
    <tr>
      <td><p><code>address()</code></p></td>
      <td><p>
returns the bound address, the address family name ('IPv4'..etc) and the port number.

      </p></td>
    </tr>
    <tr>
      <td><p><code>getConnections([cb])</code></p></td>
      <td><p>

        Asynchronously get the number of concurrent connections to the server. Callback takes two arguments: err and count.

      </p></td>
    </tr>
  </tbody>
</table>
</div>


### TCP server Events:

The TCP server as we already know from last chapter(chapter3) that it's a EventEmitter. Basically it has 4 events.

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Events</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>listening</code></p></td>
      <td><p>

Emitted when the TCP server has been bound after <code>server.listen();</code>

      </p></td>
    </tr>
    <tr>
      <td><p><code>connection</code></p></td>
      <td><p>

       Emitted when the new connection is made by a client. Callback gets the Socket object.

      </p></td>
    </tr>
    <tr>
      <td><p><code>error</code></p></td>
      <td><p>
Emitted when an error has occurred. <code>close</code> event will be directly emitted when this happens.

      </p></td>
    </tr>
    <tr>
      <td><p><code>close</code></p></td>
      <td><p>

        Emitted when the server closes. Emited only after all existing connections have been ended.

      </p></td>
    </tr>
  </tbody>
</table>
</div>


To know more we can study [net](https://nodejs.org/api/net.html) module.

### Creating a TCP Server

```js

var net = require('net');

var server = net.createServer(function(socket) {
    // the socket has end method
    socket.end('Hello World');// Socket is a Duplex stream (those streams which are both readable and as well as writable)
});

server.listen(3000, function() {
    console.log("Server is listening on Port 3000");
});
```
**TCP Socket Object**: The one which gets passed with every single instance of your connection is basically a duplex object which is readable as well as writable.

It is created in two ways:
- By the user and user as a client:

> Either by doing `new net.Socket()` (some config options can be passed, to know more refer [here](https://nodejs.org/api/net.html#net_new_net_socket_options))

> Or by doing a net.createConnection(options[, connectionListener]): This is factory method that returns a new net.Socket object and also connects to the supplied port and address.

- By Node and passed to the `connection` listener.

## Socket Events: Beside the usual Stream events


<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Events</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>connect</code></p></td>
      <td><p>

emitted when socket connection is established successfully.

      </p></td>
    </tr>
    <tr>
      <td><p><code>lookup</code></p></td>
      <td><p>

       emitted after resolving the host name but before connecting. The callback has err, address and family agruments.

      </p></td>
    </tr>
    <tr>
      <td><p><code>timeout</code></p></td>
      <td><p>
emitted when the socket times out from the inactivity. This is only to notify that the socket it idle. Socket has to be closed explicitly.

      </p></td>
    </tr>
    <tr>
      <td><p><code>other</code></p></td>
      <td><p>

        Other stream related events are :<code>data</code>, <code>error</code>, <code>close</code>, <code>end</code>, <code>drain</code>.

      </p></td>
    </tr>
  </tbody>
</table>
</div>


## Socket methods:

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>Methods</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>connect(port<br>[, host]<br>[, connListener]<br>):</code></p></td>
      <td><p>

This connects the socket to the host at the specified port number. If host is empty, localhost is assumed. This is usually not needed to be called, since the net.createConnection() method automatically does this for you.

      </p></td>
    </tr>
    <tr>
      <td><p><code>setEncoding([en])</code></p></td>
      <td><p>

       sets the encoding.

      </p></td>
    </tr>
    <tr>
      <td><p><code>write(data<br>[, encodingType]<br>[, callback]<br>):</code></p></td>
      <td><p>
Similar to duplex stream's write function. The callback is executed one write is complete - which may not be immediately.
      </p></td>
    </tr>
    <tr>
      <td><p><code>end([data]<br>[, encoding]<br>):</code></p></td>
      <td><p>

        Similar to duplex stream's end(). This half-closes the socket. However the server may still send data.

      </p></td>
    </tr>

    <tr>
      <td><p><code>destroy()</code></p></td>
      <td><p>

       This ensures no more I/O on this socket.

      </p></td>
    </tr>
    <tr>
      <td><p><code>pause()<br>and<br>resume():</code></p></td>
      <td><p>
Similar to non-flowing streams.
      </p></td>
    </tr>

    <tr>
      <td><p><code>setTimeout(<br>timeout<br>[, callback]<br>):</code></p></td>
      <td><p>

       Sets the timeout in milliseconds. THis is the idle time period of the socket after which the <code>timeout</code> event is emitted. This is however doesn't sever connection. The optional callback becomes a one time listener to the <code>timeout</code> event.

      </p></td>
    </tr>
    <tr>
      <td><p><code>setNoDelay(bool):</code></p></td>
      <td><p>
if true, disables the Nagle Algorithm (This algorithm, buffers data before sending it off)
      </p></td>
    </tr>

    <tr>
      <td><p><code>setKeepAlive(<br>[enable]<br>[, initialDelay]<br>):</code></p></td>
      <td><p>

       The keepalive packet is sent to check if the link between server and client is active or not. Set the initialDelay value to set the delay between last data packet received and the first keepAlive probe. (See http://en.wikipedia.ord/wiki/Keepalive to understand Keep Alive functionality)

      </p></td>
    </tr>
    <tr>
      <td><p><code>address():</code></p></td>
      <td><p>
Returns the bound address of the socket.
      </p></td>
    </tr>
  </tbody>
</table>
</div>


## Socket properties:

- `remoteAddress`: Remote IP address
- `remoteFamily`: IP address family of the remote IP
- `remotePort`: Remote port number
- `localAddress`: Local IP address
- `localPort`: Local port number
- `bytesRead`: Amount of bytes received
- `bytesWritten`: Amount of bytes sent


## A TCP client

```js

var net = require('net');

var socket = net.createConnection({port:4000, host:'192.168.0.1'});

socket.on('connect', function(){
    console.log('Connected to the server');
});

socket.end('Hello Server');

/*
 * We can now create a command line TCP chat server and client by using the //process.stdin (Readable Stream) and process.stdout(Writable)
 * */

```

Using the net module I have created the client-server communication program. The programs are [tcp client](./client.js) and [tcp server](./server.js).

