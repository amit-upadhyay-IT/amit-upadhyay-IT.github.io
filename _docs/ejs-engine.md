---
title: EJS  engine
permalink: /docs/ejs-engine/
---

<div class="note info">
  <h5>EJS (Embedded JavaScript templates engine)</h5>
</div>

First we will create a very basic `EJS` template page and then we will try to modularize it by dividing that page to multiple files, so initially we will be having only one file and later on we will divide code into multiple files. `EJS` is exactly similar to `java jsp`.

**Lets create new application**.

- Go to the directory and make `package.json` file : `npm init`, fill details.
- Install express and ejs in your project :
```sh
$ npm install express --save
$ npm install ejs --save.
```
- Now create app.js file(the main entry point of the application).

### Example code:

```js
var exp = require("express");

var app = exp();

app.set('view engine', 'ejs');

var port = process.env.PORT || 4000;

app.listen(port, function(){

    console.log("Server is listening on port "+port);

});
```

The template engine of ejs is internally called by express. So we don't require to `import` `ejs` in our app.js file. Previously we have seen that the libraries which need not get required are global libraries but `ejs` is not a global library at all. Its a third party library and it will be indirectly get called by express.

**For this we write**:

```js
app.set('view engine', 'ejs');
```

So this line it self is responsible for the calling of `ejs`. So one more point to be noted here is that ejs has not existence out of express so it is a library which is always used from within express only and express allows us to use the template engine of not only ejs but also `handlebars`, `Jade` and many others. So for that purpose we are saying here is that the view engine for this application is going to be `ejs` template engine.

Also whenever we login to the application i.e. move to the link where the application gets open to us. And we don't specify any specific path basically when we say `localhost:port` then at that time we are referring to the path `/` and that moment we want to see the home page of our application.

So for that we write `res.render('home.ejs', {});` in the callback `app.get('/', cb);`

Example:

```js
var exp = require("express");

var app = exp();

app.set('view engine', 'ejs');

app.get('/', function(req, res){

    res.render('home.ejs', {}); // the variables will be provided within the {} i.e. an object.

});

app.get('/:city', function(req, res){// the : specifies the positional parameter of referring to the request parameter
    /* so whenever you go this web site and say /some_city then at that time that some_city page has to be shown
     so that's why we are going to create a second template file which we are calling as 'city.ejs'.
     so this application is going to have two different template file, one for the home page and other for every city*/
    res.render('city.ejs', {});
});


var port = process.env.PORT || 4000;

app.listen(port, function(){

    console.log("Server is listening on port "+port);

});
```


Now lets create the `ejs` (ejs file are the template files) files. We will create some folder by name `views`. If you create a folder by different name then that doesn't work by default. In that case you will have to write extra lines in `app.js` file. Now inside this folder `views` we just need to create
two file which are mainly like `HTML` kind. It will have some JavaScript code sprinkled (embedded) somewhere inside.

Lets first create `home.ejs` file inside `views` folder.

```html
<html>
	<body>
	<ul>
		<li> <a href = "/"> Home </a> </li>
		<li> <a href = "/london"> London </a> </li>
		<li> <a href = "/newyork"> New York </a> </li>
		<li> <a href = "/paris"> Paris </a> </li>
		<li> <a href = "/newdelhi"> New Delhi </a> </li>
	</ul>
	<h1> <%=title %> </h1>
	<h4> <%=headline %> </h4>
	Home Page
	</body>
</html>
```

**Understanding <%=title %>**:

whatever JavaScript code that you want to embed here in .ejs file is written inside `<%= %>`. So this is just `embedded JavaScript writing notation`. There will be a `variable` with name `title` (passed as the second argument as JavaScript object in the app.get() method) and its  value will get substituted within `h1`.



**Lets now create `city.ejs` file**:

```html
<html>
	<body>
	<ul>
		<li> <a href = "/"> Home </a> </li>
		<li> <a href = "/london"> London </a> </li>
		<li> <a href = "/newyork"> New York </a> </li>
		<li> <a href = "/paris"> Paris </a> </li>
		<li> <a href = "/newdelhi"> New Delhi </a> </li>
	</ul>
	<h1> <%=title %> </h1>
	<h4> <%=headline %> </h4>
	City Page
	</body>
</html>
```


Now lets move back to `app.js` file. So whenever the user goes to the web site and just does `localhost:port/`. Then `app.get('/')` callback will get executed.

### Example of `app.js` file:

```js
var exp = require("express");

var app = exp();

app.set('view engine', 'ejs');

app.get('/', function(req, res){

    res.render('home.ejs', {title:"I Love my city",
    headline:"Every city has its own personality"});

});

app.get('/:city', function(req, res){

    var cityname = req.params.city;
    var titleValue;
    var headlineValue;

    // based on city I'll modify the titleValue and headlineValue
    if (cityname === 'newyork')
    {
        titleValue = "New York";
        headlineValue = "Business capital of the world";
    }

    else if (cityname == 'london')
    {
        titleValue = "London";
        headlineValue = "City of Thames";
    }

    else if (cityname == 'newdelhi')
    {
        titleValue = "New Delhi";
        headlineValue = "Place where I live";
    }

    else if (cityname == 'paris')
    {
        titleValue = "Paris";
        headlineValue = "Place where I never visited";
    }

    res.render('city.ejs', {title:titleValue, headline:headlineValue});
});


var port = process.env.PORT || 4000;

app.listen(port, function(){

    console.log("Server is listening on port "+port);
});
```

Now you can run your `app.js`. You will find everything working fine.

Next page you will find out optimizing the code design.
