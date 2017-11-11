---
title: File upload using formidable
permalink: /docs/file-upload-formidable/
---

<div class="note info">
  <h5>Example use of formidable module</h5>
  <p></p>
</div>


A Node.js module for parsing form data, especially file uploads. To know more visit [here](https://github.com/felixge/node-formidable). The example in index.js is taken from the `node-formidable` github repo.

If you run server and upload file successfully, you will see something like this:

```
received upload:

{ fields: { title: 'sasdf' },
  files: 
   { upload: 
      File {
	domain: null,
	_events: {},
	_eventsCount: 0,
	_maxListeners: undefined,
	size: 232,
	path: 'upload/upload_29534ab62167314f887b9b6bf6f3be8b',
	name: 'example.cpp',
	type: 'text/x-c++src',
	hash: null,
	lastModifiedDate: 2017-09-25T19:21:32.590Z,
	_writeStream: [Object] } } }
```

As you can see, how simple it gets handeling file uploads. If you see the example at the github repo, there you wouldn't find 
```js
form.uploadDir = './upload';
```
Setting the property `uploadDir` on the form makes the file available at `upload` folder, which is uploaded by the client.

[This](https://www.sitepoint.com/introduction-to-streams/) is one beautiful link about streams.
