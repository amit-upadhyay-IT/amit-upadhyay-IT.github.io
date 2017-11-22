---
title: Handlebars Engine
permalink: /docs/handlebars/
---

{: .info .note}
**What is Handlebars Templating Engine?**<br>Handlebars is widely used templating engine. Handlebars templates look like regular `HTML`, with `embedded handlebars expressions`.


```html
<div class="entry">
  <h1>
    <code>{ { title }}</code>
  </h1>
  <div class="body">
    { {body}}
  </div>
</div>
```

Here `{ {title}}` and `{ {body}}` are `Handlebars expressions`.

Handlebars is a bit similar to EJS template engine in structure and uses HTML markup syntax. Handlebars offers built in helpers and you can create your own helpers, Handlebars offers partials which allow for code reuse.

Lets write an application using Handlebars. Handlebars syntax is little simpler than Jade.


{: .note}
**What our application will do?**<br>It will first ask for user login, after the the user will be directed to a page where he/she can enter the choice he wants to know about.


### Steps:

- Install required libraries. Example: `express` and `express-handlebars`


```sh
$ npm install express --save
```
```sh
$ npm install express-handlebars --save
```

or simply do,
```sh
$ npm i express express-handlebars -s
```

- Now lets install some `middlewares` which we need in the process of developement of app. To know about middleware you can see [this](http://localhost:4000/docs/middlewares/) post. A typical requirement is to handle sessions thus I am going to install `express-session` library. 

```sh
$ npm i express-session -s
```

`express-session` takes care of your session handling by creating a session on server side. If you don't have session facility provided by your server side page generation engine then `http` being a stateless protocol so nothing will be remembered across the request and response cycle. One request, one response and then everything will get forgotten. So we require `express-session`.


In this application we are going to use `post` request of `http`. The benefit of post request is that it doesn't have a limit of some specified size (i.e. we can send a large request too). Also anything that is being sent in the post request, it comes in the body section of your HTTP request and it doesn't appear in the URL so its a bit safer to send any data in the post request.

To retrieve data from the post request you need a middle-ware which is called `body-parser`.

```sh
$ npm i body-parser -s
```








