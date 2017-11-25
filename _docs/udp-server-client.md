---
title: UDP server client
permalink: /docs/udp-server-client/
---


<div class="note">
  <h5>UDP/Datagram Socket</h5>
</div>

Unlike the TCP, which is connection-oriented protocol that ensures reliable and ordered transfer of data, the UDP is a connection-less, unordered and the data is not even guaranteed to arrive at the destination.

To use the protocol we use the 'dgram' module of node.

#### Applications and Uses
Whenever data has to be broadcast quickly and widely like DNS, VoIP, IPTV, DHCP

#### To create Datagram socket:

`createSocket(type[, callback])` where type can be either `udp4` or `udp6`. Callback is a listener to message events

```js
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
```

You don't need to bind the socket to any port to send a message, it will bind to any random UDP port.

If you need to, bind a port number, then you can use: `socket.bind(4000)` i.e. we can also give a host address and a callback as additional arguments
   `
### To send a new message using UDP socket:

```js
var buff = new Buffer('Hello World');// socket don't take direct strings or integers, we need to provide the buffer for the communication to happen.
socket.send(buff, 0, buff.length, 4000, '192.168.0.23'); // where buff contains the message, 0 is the offset in the buffer, buff.length: the length of the message, the port number and the ip address of the destination

```
**Or with a callback**

```
 
var buff = new Buffer('Hello World');

socket.send(buff, 0, buff.length, 4000, '192.168.0.23', function(err) {
    if (err) console.log(err);
    socket.close();
});

```

#### To listen to socket messages, we can listen to the 'message event':

Here we have 'message' event
```js
socket.on('message', function(msg, rinfo){
        // mst is the message sent
        // rinfo is the remote address information
});

```
To know more about multicasting, etc. refer [here](https://nodejs.org/api/dgram.html#dgram_socket_setmulticastttl_ttl).

### Example of udp server-client communication.

#### server.js

```js
var dgram = require('dgram');
var port = 1234;
var host = '127.0.0.1';

var server = dgram.createSocket('udp4');

server.on('listening', function() {
    var address = server.address();
    console.log('UDP Server listening on '+address.address+':'+address.port);
});

server.on('message', function(message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);
});

server.bind(port, host);

```

#### client.js

```js
var dgram = require('dgram');
var port = 1234;
var host = '127.0.0.1';
var client = dgram.createSocket('udp4');

// we need not listen to anything here as we are doing in case of server.js

var message = new Buffer('Hello World!');

// we directly talk to our server on the given host and port
client.send(message, 0, message.length, port, host, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + host + ':' + port);
    client.close();
});

```

#### Server output console:
```sh
[aupadhyay@localhost example4:udp_server_cli]$ node server.js 
UDP Server listening on 127.0.0.1:1234
127.0.0.1:45360 - Hello World!
127.0.0.1:58932 - Hello World!
127.0.0.1:46014 - Hello World!
127.0.0.1:51234 - Hello World!
127.0.0.1:42728 - Hello World!
```
#### Client output console:
```sh
[aupadhyay@localhost example4:udp_server_cli]$ node client.js 
UDP message sent to 127.0.0.1:1234
[aupadhyay@localhost example4:udp_server_cli]$ node client.js 
UDP message sent to 127.0.0.1:1234
[aupadhyay@localhost example4:udp_server_cli]$ node client.js 
UDP message sent to 127.0.0.1:1234
[aupadhyay@localhost example4:udp_server_cli]$ node client.js 
UDP message sent to 127.0.0.1:1234
[aupadhyay@localhost example4:udp_server_cli]$ node client.js 
UDP message sent to 127.0.0.1:1234
[aupadhyay@localhost example4:udp_server_cli]$ 
```

#### NOTE:
**The port ant the host on which the client is created was random**. Any random port will do.


