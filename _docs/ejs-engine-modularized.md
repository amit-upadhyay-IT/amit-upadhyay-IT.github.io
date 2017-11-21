---
title: Modularizing ejs
permalink: /docs/ejs-engine-modularized/
---


<div class="note info">
  <h5>Why do you need modularisation?</h5>
</div>

We should not write lots of code in the main file rather we should shift it to some other file. This will obviously make your app maintainable. So lets utilize our knowledge of custom modules and move some code segments like implementation of two different paths which are `/` path and `/city` path. The paths are nothing but the `routes` to our application. So we are gonna move those code snippets which are responsible for opening the routes `/` and `/city`. Thus for convenience we name that folder as the `routes`. Its just convention even if we name it something else then also things really doesn't mater. We explicitly have to specify the path anyway.

**Now there are two things which we can do:**

1. Create one file `route.js` file which will contain the code for all the routes in the application.
1. Create different `files` for different `routes`.

### Using the first approach (just creating one file):

`file path: /routes/route.js`


```js
exports.home=function(req,res){
  res.render('home',{title:'iLoveMyCity', headline:'We believe that every city have something to say'});
}


exports.city=function(req,res){
    var cityName=req.params.city;
    var title,heading;
    var imageCount=4;

    if(cityName==='berlin'){
       title="Berlin";
       heading="Berlin: Where love is in the air";
    }
    else if(cityName==='paris'){
       title="Paris";
       heading="Paris: Good talkers are only found in Paris";
    }
    else if(cityName==='madrid'){
       title="Madrid";
       heading="Madrid: Buzz, Beautiful architecture and Football";
    }
    else if(cityName==='london'){
       title="London";
       heading="London: Sparkling, Still, Food, Gorgeous";
    }
    else if(cityName==='newyork'){
       title="New York";
       heading="New York: Come to New York to become someone new";
       imageCount=6;
    }

    res.render('city',{
        title:title,
        headline:heading,
        city:cityName,
        numberOfImages:imageCount
  });
}
```

Here you can see there are two functions which are being exported (`home` and `city`). Now these function will be passed as the second argument (as callback) of `app.get()` method for their respecitve routes in the main file (`app.js` or `index.js`).

Example:

```js
var routes=require('./routes/route.js');
...
...
app.get('/',routes.home);
app.get('/:city',routes.city);
```

### Using the second approach (creating different files different routes):

`file path: /routes/home.js`

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{title:'iLoveMyCity', headline:'We believe that every city have something to say'});
});

module.exports = router;
```

`file path: /routes/city.js`

```js
var express = require('express');
var router = express.Router();

/* GET city listing. */
router.get('/', function(req, res, next) {
    var cityName=req.params.city;
    var title,heading;
    var imageCount=4;

    if(cityName==='berlin'){
       title="Berlin";
       heading="Berlin: Where love is in the air";
    }
    else if(cityName==='paris'){
       title="Paris";
       heading="Paris: Good talkers are only found in Paris";
    }
    else if(cityName==='madrid'){
       title="Madrid";
       heading="Madrid: Buzz, Beautiful architecture and Football";
    }
    else if(cityName==='london'){
       title="London";
       heading="London: Sparkling, Still, Food, Gorgeous";
    }
    else if(cityName==='newyork'){
       title="New York";
       heading="New York: Come to New York to become someone new";
       imageCount=6;
    }

    res.render('city',{
        title:title,
        headline:heading,
        city:cityName,
        numberOfImages:imageCount
  });
});

module.exports = router;
```

Now to use them in your main file (`app.js` or `index.js`), you need to write:

```js
var index = require('./routes/home');
var users = require('./routes/city');
...
...
app.use('/', home);
app.use('/city', city);
```

Now it's upto you which design pattern you will like to use. In my case I would like to use the later one if I have lots of routes in my application otherwise the first approach would be better.


## EJS partials

The way we segregated the code of `app.js` into `app.js` and `routes.js` similarly anything which is being repeated in `home.ejs` and `city.ejs` file then we use `EJS partials`. If you see then you will find that the `menu` part inside both the `.ejs` file are same. So this is not a good idea to keep same code in different files. So we extract the common code and keep it somewhere which we can refer later. For doing this, create a new folder under `views` folder with name `partials` (this is just a convention, we can have any name for the folder).


Create a new file with name `menu.ejs` (name can be anything of your choice).Code of `menu.ejs`:

```html
<ul>
<li> <a href = "/"> Home </a> </li>
<li> <a href = "/london"> London </a> </li>
<li> <a href = "/newyork"> New York </a> </li>
<li> <a href = "/paris"> Paris </a> </li>
<li> <a href = "/newdelhi"> New Delhi </a> </li>
</ul>
```

Also change your `home.ejs` file and `city.ejs` file:

`city.ejs`

```html
<html>
<body>
<% include partials/menu.ejs %>
<h1> <%=title %> </h1>
<h4> <%=headline %> </h4>
City Page
</body>
</html>
```

`home.ejs`

```html
<html>
<body>
<% include partials/menu.ejs %>
<h1> <%=title %> </h1>
<h4> <%=headline %> </h4>
Home Page
</body>
</html>
```
