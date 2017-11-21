---
title: TLS/SSL
permalink: /docs/tls-ssl/
---


<div class="note">
  <h5>Secure Network Communication - TLS/SSL</h5>
</div>


The `tls` module provides an implementation of the **Transport Layer Security (TLS)** and **Secure Socket Layer (SSL)** protocols that is built on top of `OpenSSL`. 

The `TLS/SSL` is a `public/private key` infrastructure (PKI). For most common cases, each client and server must have a private key. Read [here](https://nodejs.org/api/tls.html#tls_tls_ssl_concepts)


## Communication over HTTP vs Communication over HTTPS
In HTTPS the communication between server and client is encrypted. The communication between the server and client goes on based on a secure encrypted stream, i.e. the server and client only they can understand things. The encryption happen on the server and the client using a certificate. In the browser you can see the certificate details too by clicking on the 'https'.

#### Why is this important? Where is it used?

There is something called IP sniffing, so people can sniff your IP address and see what packets are being transmitted from your machine to the outside (server) machine.

For example: You have AWS cloud server that you are trying to push your data to (which is a secure server). But if you are making your data from your client to your server go via a http (or a plain protocol where there is no encryption involved) anybody who can see your packets are able to decode what you are trying to send it along with that packet.
The best example for this is [Fidler](), it is basically a web debugging proxy. These modern debugging tool are so awesome that you can debug anything on the client side. It's always best to have server side validation as well as client side validation irrespective of your server being RESTFUL api.:W

The next level of security hacking that can happen is that when you are connected to a coffee-shop WiFi, where somebody is sniffing all your connection that is going from your machine through the router and they can identify what is happening. The tool like Fidler does exactly like that. It can inspect all your web request that leave your browser and then which goes to your server. It is inbetween the browser and your server. So this is where the Secure Socket Layer communication comes into picture. So using SSL security layer, you can send data from client to server in encrypted stream and that is what we are trying to acheive using th 'tls' module.

Some of the companies only have their login page with TLS/SSl secured (i.e. https). They don't want all the pages in the application to have https. The reason is that because it takes time for encryption and decryption from the client and server, we will probably end up wasting few milliseconds on each request.

## Create certificate

### 1. Create a key (a .pem file)

```sh
openssl genrsa -out amit-key.pem 2048
```

The name of the key file is 'amit-key.pem', you can have key with whatever name you want. The above command is going to create a RSA private key which is 2048 bit long.

### 2. Now we create our csr file from our key.

```sh
openssl req -new -sha256 -key amit-key.pem -out amit-csr.pem

```sh
When you enter above command you will be asked some informations about company, etc. This is a file using which we are trying to tell that I am a valid server trust me on all these basis. After all these a 'amit-csr.pem' file is created based on the 'amit-key.pem' file.


### 3. Now create a certificate file (cert file):

```sh
openssl x509 -req -in amit-csr.pem -signkey amit-key.pem -out amit-cert.pem
```


### 4. Create a `pfx` file.
We need all these files generated to work with our certificates. Once you have these three files then you are going to send this infomation to a public authority and then they are going to give you another file which says that "you are a valid user(every body can trust it)".

In case we don't have that then we need to create a `.pfx` file.

```sh
openssl pkcs12 -export -in amit-cert.pem -inkey amit-key.pem -certfile amit-cert.pem -out amit.pfx

```

Finally we are going to certify that the certificate we just created is valid. With the help of above command we have created a self signed certificate. You can read more about pfx file [here](https://nodejs.org/api/tls.html#tls_perfect_forward_secrecy).

### 5. Finally create a TCP server using tls module.

**Remember**: I am telling you the very core concepts of node.js. You need worry about how to do these thing when you are working with express app. They are already doing all these.

[Here](https://github.com/ZiCog/node-tls-example) is a more elegant way of setting up the tls/ssl.

### Clinet side code

```js
var tls = require('tls'),
    fs = require('fs');

var options = {
    key: fs.readFileSync('./certificates/ryans-key.pem'),
    cert: fs.readFileSync('./certificates/ryans-cert.pem'),

    // this is necessary only if the server uses the self-signed certificate
    ca: [fs.readFileSync('./certificates/ryans-cert.pem')]
};

var conn = tls.connect(1234, options, function() {

    // here the point is when we are trying to make a communication from client to server then the certificate should match
    if (conn.authorized)
    {
        console.log('Connection authorized by a Certificate Authority.');
    }
    else
    {
        console.log('Connection not authorized: '+conn.authorizationError);
    }
    console.log('Connection created');
});

conn.on('data', function (data) {
    console.log(data.toString());
    conn.end();
});
```

### Server side code

```js
var tls = require('tls'),
    fs = require('fs');

var options = {
    key: fs.readFileSync('./certificates/ryans-key.pem'),
    cert: fs.readFileSync('./certificates/ryans-cert.pem'),

    // this is necessary only if the server uses the self-signed certificate
    ca: [fs.readFileSync('./certificates/ryans-cert.pem')]
};

tls.createServer(options, function(socket) {

    //console.log('connected : ', socket);
    socket.write('Hello World !\n');
    socket.pipe(socket);// since socket both readable and writable so we gonna pipe one content to other

}).listen(1234);
```

You may find some other examples below:

[tls-client.js](https://github.com/ZiCog/node-tls-example/blob/master/tls-client.js)

[tls-server.js](https://github.com/ZiCog/node-tls-example/blob/master/tls-server.js)

### How does tls/ssl work?

[Link](https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work)
