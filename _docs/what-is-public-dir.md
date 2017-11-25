---
title: What is public Dir?
permalink: /docs/what-is-public-dir/
---


<div class="note">
  <h5>Code example</h5>
</div>

Generally what happens is that in any standard web server of `java` or `php` there is a `public` folder and that contains your images, css, JavaScript's basically anything that you want freely visible to your clients. For that there is a provision here, in the program directory you need to create a folder named `public`. There is nothing special in that name, the name can be anything. Since you are going to keep public data so for convenience we name dir as `public`.

**Now in your applicatin you need to write**:

```js
app.use(exp.static(__dirname+"/public"));
```

Meaning of `static` is that all your static info like `static html`, `images`, `css`, etc we are going to keep in a folder which is under directory named public.

`static` is an **express middleware**. There are other **express middleware** like `bodyparser` (a 3rd party library which is used to get details from post request), `express-session` (used to manage the session beyond one request-response cycle). All the template engines are middleware too.

#### Example:

```js
var exp = require("express");

var app = exp();

app.use(exp.static(__dirname+"/public"));

var port = process.env.PORT || 4000;

app.listen(port, function(){
	console.log("Server is listening on port "+port);
});
```

And now when I enter the url as : `http://localhost:4000/image.jpg` then I'll get the image that is kept inside public folder with name `image.jpg`.


Now lets create a file with name : `index.html`. This is a very special name. You just place this file in `public` folder. And whenever you access the `localhost:4000` then automatically you will get to see this `index.html` page. So the speciality with the public folder is that if you have a file named `index.html` within that folder then anybody who is accessing your application without specifying any path(accessing it using the url and port number) then that `index.html` is returned to the browser.

