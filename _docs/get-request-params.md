---
title: Getting request parameters
permalink: /docs/get-request-params/
---


<div class="note">
  <h5>How are parameters are passed in a typical get request from the browser to the web server?</h5>
</div>

Below is an example of get request:

```
http://localhost:4000/players/?name=%22amit%20upadhyay%22&age=19&year=2016
```

You can see how the request params are passed in the above get request.

<div class="note info">
  <h5>How node.js applications can get to those parameters?</h5>
</div>
Sometimes the developer may need to access these parameters for their purpose. Below is a program which illustrates the same.

```js
var exp = require('express');

var app = exp();

app.get('/players', function (req, res) {
    var query = req.query;

    console.log('Query value: '+ JSON.stringify(query));

    res.end(JSON.stringify(query));
});

var port = process.env.PORT || 4000;

app.listen(port, function (){
    console.log('Server is listening on port '+port);
});
```

**NOTE**: As far as Express is concered `req.query` is all which is required to get the request parameters in our program. Supposing that we had a `http` server using the `http` core module, then to get the request params we need to get the url using `req.url` then parse it.

And that can be done like this:

```js
var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query;
```

However, in expressjs it's already done for you and you can simply use `req.query` for that.

**NOTE** : when we use end() method then we can't display any further messages on web page.

So, we sould use `res.write();` unless required to use `res.end();`.

#### Example:

```js
res.write('Name = '+ query.name);
res.end('\nAge = '+query.age);
res.end('This statement should not go to the response');
```

You can try running the code and see the output on your web browser.


Okay, so this is way in which you can pass any url parameters in node.js applications and this is how you can retrieve all the values. But this is just one method and there are several other methods to achieve the same thing. So lets see another way to perform same task.

The **advantage of using this technique of passing url parameter** is that in this way I've freedom of passing the arguments in any order. i.e. first I can pass the age and the name. Still the result will be same. Also we are passing things in a key value pair.

There can be other ways of passing the url.
Example:

```
http://localhost:4000/players/amit/19/2016
```

Thus we need to make a protocol that whatever is passed after players is name and after that we have age. So for analyzing that kind of request we need to write a different application.

Example:

```js
var exp = require('express');

var app = exp();

app.get('/players/:name/:age', function (req, res) {

    // in this case query isn't required because the values will be coming directly from the path only

    res.write('name = '+ req.params.name);
    res.end('\nage = '+ req.params.age);
});

var port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
```

These are positional parameters so position is very important. On executing this you will get the desired. Also, after executing the code when you enter the url as : ```http://localhost:4000/players/amit/19/2016``` you will not get a correct/desired output. Because there is one additional parameter and that is 2016 for which we haven't made the `get()` request.

These days this is more prevalent way of passing parameters in get request, we need not pass key value but we pass different values separated by `/`. We will be using this another application very soon when we will learn about templates. So in this application and the previous application the objective way to let you know how url parameters are passed in a application and how they are accessed on the server side. Based on that you can do something and return the response appropriately.
