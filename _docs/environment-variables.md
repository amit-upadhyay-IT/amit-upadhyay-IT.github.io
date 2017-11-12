---
title: Environment variables
permalink: /docs/environment-variables/
---


<div class="note">
  <h5>Code example</h5>
</div>


```js
// process is global variable.
if (process.env.NODE_ENV == 'http')
{
    console.log('Start HTTP server');
}
else
{
    console.log('Start HTTPS server');
}
```

calling example 1:

```sh
$ NODE_ENV=http node index.js

Start HTTP server # output
```

calling example 2:

```sh
$ NODE_ENV=https node index.js

Start HTTPS server # output
```

