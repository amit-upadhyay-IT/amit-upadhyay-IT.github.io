---
title: Using CLI arguments
permalink: /docs/using-cli-args/
---


<div class="note">
  <h5>Code example</h5>
</div>


<div class="note info">
  <h5>What does <code>process.argv</code> have?</h5>
</div>

<div class="note unreleased">
  <h5>Well, try doing <code>console.log(process.argv);</code> dude.</h5>
</div>


### Example code:

```js
//var checkpackage = require('../../../checkpackage/index.js');

checkpackage = require('checkpackage');

var name = process.argv.slice(2)[0];

console.log('Searching ...')
if (name)
    checkpackage(name);
else
    console.log('Kindly enter an package name');
```

<div class="note">
  <h5>package.json</h5>
</div>

```js
{
  "name": "example1",
  "version": "1.0.0",
  "description": "testing",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "amit",
  "license": "ISC"
}
```

