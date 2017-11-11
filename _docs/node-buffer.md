---
title: Buffer
permalink: /docs/node-buffer/
---

Pure JavaScript is Unicode friendly, but it is not so for binary data. While dealing with `TCP streams` or the `file system`, it's necessary to handle octet streams. Node provides `Buffer` class which provides instances to store raw data similar to an array of integers but corresponds to a raw memory allocation outside the `V8 heap`.

`Buffer` class is a global class that can be accessed in an application without importing the `buffer module`.

[Here](https://nodejs.org/api/buffer.html) you can find more.
