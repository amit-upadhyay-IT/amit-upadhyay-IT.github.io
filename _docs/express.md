---
title: ExpressJS
permalink: /docs/express/
---


<div class="note">
  <h5>ExpressJS</h5>
</div>

Example of a simple server made using express:

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
```

The setup for express application is pretty simple. The amount of coding we needed to do when we used `http` or `net` module to create server, set up `GET`, `POST` request was huge. But here it's very simple. All you need to do is invoke express and assign it to a variable (`app`). It has lots of method pre-build.

Example 2:

Creating the JSON data end point, where I am sending the data back to the client.

```js
app.get('/api/data', function (req, res) {

    res.json({
        'hello' : 'world'
    });
});
```

If you do a GET on url ```http://localhost:3000/api/data```, then you can see the response (which is a JSON object). Try to do a GET request using `POSTMAN` to see the Headers.

```sh
connection →keep-alive
content-length →17
content-type →application/json; charset=utf-8
date →Thu, 26 Oct 2017 12:01:16 GMT
etag →W/"11-IkjuL6CqqtmReFMfkkvwC0sKj04"
x-powered-by →Express
```
are the headers for the GET request. The content-type is `application/json` already (we didn't set this in the code).

So you can see in less then a minute we can build api server ground up with a couple of commands.

Example 3:

Making an api server which fetches data form the mongodb cloud server and gives it as response to the client.

```js
var express = require('express');

var mongojs = require('mongojs');
var db = mongojs('mongodb://adminamit:amit123@ds121955.mlab.com:21955/amitmongodb', ['users']);// connecting to cloud db to get the list of users


var app = express();

app.get('/', function (req, res) {
    res.send('You are at /');
});

app.get('/api/v1/users', function (req, res) {

    // here we are going to go to mongodb and whenever a user hits on /api/v1/users I am going to query the could interface and find all the records
    db.users.find({}, function (err, docs) {
        if (err)
        {
            res.status(500);
            res.send({
                err: new Error(err)
            });
        }
        else
        {
            res.json (docs);
        }
    });
});

var server = app.listen(2000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
```
This is typically an end to end api interface which is just build using express mongodb and nodejs.

----------------

People generally don't want to put their routes inside their main file `(index.js)`. So for that purpose we create a new file generally named as `routs.js`. In this file we define all the routes to the application.

See [this](./index4.js) file. It is the main file index4.js and it is calling function written in routes.js file. The routes.js file looks like this:

```js
var mongojs = require('mongojs');
var db = mongojs('mongodb://adminamit:amit123@ds121955.mlab.com:21955/amitmongodb', ['users']);// connecting to cloud db to get the list of users

module.exports = function (app) {// this function takes app as its argument

    app.get('/', function (req, res) {
        res.send('You are at /');
    });

    app.get('/api/v1/users', function (req, res) {

        // here we are going to go to mongodb and whenever a user hits on /api/v1/users I am going to query the could interface and find all the records
        db.users.find({}, function (err, docs) {
            if (err)
            {
                res.status(500);
                res.send({
                    err: new Error(err)
                });
            }
            else
            {
                res.json (docs);
            }
        });
    });

    return app;
};
```

Next you can separate your db configuration using another file `(./dbconfig.js)`. So we are trying t modularize our code into peace.
