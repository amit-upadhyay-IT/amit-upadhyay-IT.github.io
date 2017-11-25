---
title: Express Generator
permalink: /docs/express-generator/
---


<div class="note">
  <h5>Express application generator</h5>
</div>

Use the application generator tool, `express-generator`, to quickly create an application skeleton.

The `express-generator` package installs the express command-line tool. Use the following command to do so:

```sh
$ npm install express-generator -g
```

If you run this command, it creates entire expressjs project for you. i.e. it scaffolds the entire project which is running a model view. There are the files which gets created:

```sh
   create : .
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./routes
   create : ./routes/index.js
   create : ./routes/users.js
   create : ./views
   create : ./views/index.jade
   create : ./views/layout.jade
   create : ./views/error.jade
   create : ./bin
   create : ./bin/www
   create : ./public/javascripts
   create : ./public/images
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
```

If you see content of `package.json`, you will find several dependencies already added into it. So the whole `package.json` was scaffolded as the part of generator. Then you can see the contents of app.js.

By default when you write `express` to generate files you get a `jade` template engine.
