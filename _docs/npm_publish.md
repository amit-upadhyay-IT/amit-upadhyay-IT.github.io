---
title: npm publish
permalink: /docs/npm_publish/
---


<div class="note info">
  <h5>Publishing on npm repository</h5>
  <p>Writing your own custom modules and then publishing them on npm.</p>
</div>

The example here deals with publishing a module on npm and then using it. Here amitcalcapp is published on npm repository and then we are using it in our app.

<div class="note">
  <h5>package.json example:</h5>
  <p>Created using `npm init`, and then installed the 'amitcalcapp' module from npm repository using the command 'npm i amitcalcapp --save'</p>
</div>

```js
{
  "name": "example3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "amitcalcapp": "^1.0.3"
  }
}
```
<div class="note">
  <h5>Application's main file (index.js)</h5>
  <p>In `package.json`, you can see we have downloaded this package from npm repository.</p>
</div>

```js
var calc = require('amitcalcapp');

var a = 10;
var b = 20;

var c = calc.add(a, b);
console.log('add: ', c);
```
