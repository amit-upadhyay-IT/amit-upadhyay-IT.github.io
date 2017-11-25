---
title: Streams part 1
permalink: /docs/streams-1/
---


## Streams

A stream is an abstract interface for working with streaming data in Node.js. Streams are objects that let you read data from a source or write data to a destination in a continuous fashion.

A **stream** can be:

- > Readable: used for read operation.
- > Writable: used for the write operation.
- > Duplex: can be used for both read and write operation.
- > Transform: A type of duplex stream where the output is computed based on input


All Streams are instances of EventEmitter, but also have other methods and properties depending on whether they are Readable, Writable, Duplex or Transform. This means: Streams emit "events" and "data" along with some of those events. Some of the commonly used events are:


- > readable: emitted when data is available to read.
- > data: event is fired when there is data is available to read. Attaching a data listener (if you have not called pause() somewhere explicitly), will switch the readable stream to the flowing mode and pass data as soon as it is available. The Data arguments are either of type Buffer or String.
- > end: an event is fired when there is no more data to read.
- > error: an event is fired when there is any error receiving or writing data.
- > finish: fired when all the data has been flushed to the underlying system.
- > close: emitted when the underlying resource has been closed

Eg:
```js
var readable = getSomeReadableStream();

readable.on('data', function(chunk) {
	console.log(chunk);
});
```

## Readable Streams

These are an abstraction from a source of data to read from. That is: data flows out from Readable Stream. A Readable Stream will not start emitting data until you have indicated that you are ready to receive it.

Two modes:
- flowing: data is read from the source and provided to your program as soon as possible.
- paused: You must explicitly call read() function to read a chunk of data from the source.


You can switch to the following mode:
> Listening to the 'data' event.
> Calling resume()
> Using pipe()

We can switch to pause mode by:
> if pipe is not used them, calling pause()
> if pipe is used then remove all data event handlers and removing all pipe destinations by using unpipe()


## Writable Streams

Writable stream is an abstraction of a destination you want to write data to.

Important methods and events for Writable Streams:
- write(chunk, encoding, callback)
> chunk: the buffer or string of data to be written.

> encoding: the encoding type

> callback: called after the chunk has been properly handled.

> returns False: Not appropriate to write to the destination as yet last write data has been buffered internally. This buffer is stored in memory.

> returns True: if it is appropriate to write now.

- drain: if write() method returns False, "drain" event tells you when it is ok to write again.
- end(chunk, encoding, callback): When nothing more to write.


## Writing data from Readable to Writable: pipe()

#### First way:

```js

var rs = ...//new readable stream
var ws = ...// new writable stream

rs.on('data', function(data) {
	ws.write(data);
});

rs.on('end', function(){
	ws.end();
});

```


#### A better way:

```js
var rs = ...//new readable stream
var ws = ...// new writable stream

rs.on('data', function(data) {
	if (!ws.write(data))
	{
		rs.pause();
	}
});


rs.on('drain', function() {
	rs.resume();
});



rs.on('end', function(){
	ws.end();
});


```

#### A still better way:

```js
var rs = ...//new readable stream
var ws = ...// new writable stream

rs.pipe(ws); // it takes care of managing everything.

```

#### or optionally:

```js
var rs = ...//new readable stream
var ws = ...// new writable stream

rs.pipe(ws, {end: false});//piping is asynchronous, anything non-blocking you write below it will get executed first.


// so this way we know when the piping is completed.
rs.on('end', function(){
	// do something here.
	ws.end();
});


```

To know about `{end:false}` visit [here](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

Important methods and events for writable streams:

- pipe: event emitted when some readable stream is piping to this writable.
- unpipe: when the readable that was "piping" has been unpiped.
- error: when an error has been thrown.

## Duplex and Transform streams

- **Duplex streams** are streams that are both readable and writable, Eg: TCP socket.

- **Transform streams** are Duplex streams where the output is someway computed from the input. Eg: crypto streams.

## Path module

[Here](https://nodejs.org/api/path.html) you can find more about path module. The path module provides utilities for working with file and directory paths. It's mostly used with __dirname and __filename. There are scenarios when we want to access the file system in a more elegant way there we use it.

[Here](./index.js) is an example of Readable Streams.

### Streams using pipe()

#### Example:

```js

var fs = require('fs');

var readableStream = fs.createReadStream('data.txt');
var writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);

```

The data from the `data.txt` is copied to `output.txt` file. If `data.txt` is really a huge file sometimes if we open `output.txt` file it keeps updating the file, so that's how streams work.

### Where is the big real-time use case of streams?

One major place is `File Uploads`, so we have people who are uploading GBs of data (youtube videos, Dropbox upload, facebook pics). This is a perfect place where the stream comes into pictures. So we are not burdening the main application logic to wait till the upload is completed (and this Ryan Dahl didn't want).


Using streams is one of the powerful processes of handling file systems.

Some people serve their server-side files using compression called as gzip compression. The browser on the client side is smart enough to unzip the file. All your server needs to do is, zip file and send it across to the client. Once we have a particular file zipped up, we can save the network bandwidth. Instead of transmitting a big file we are transmitting a small one because the browser is smart enough to unzip it.

[Here](./index3.js) is an example where I have used streams to accomplish the above concept. [Here](./bower_components/angular), you can see the size of `angular.js` file, `angular.min.js` file (1/8th of the angular.js file) and `angular.min.js.gzip` file (1/22th of  the anjular.js file). So we are dispatching a 1/22th size of the main file over the network because the browser is smart enough to decompress it.


```js

var fs = require('fs');
var zlib = require('zlib');

var readableStream = fs.createReadStream('./bower_components/angular/angular.min.js.gzip');

readableStream
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('angular.min.js'));

```

The point or the example that is being shown is that the streams can be as powerful as piping content from one thing to another. Streams are going to be used for file uploads.
