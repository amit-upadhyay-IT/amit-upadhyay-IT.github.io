---
title: Handlebars Engine part 3
permalink: /docs/handlebars3/
---

In the `public` dir we need to keep the images and `css` files.

{: .unreleased .note}
**public css**<br>file path: `./public/styles.css`

```html
.cursive-text-large{
 font-family: lobster-two, cursive;
 font-size: 40px;
}

.cursive-text-small{
 font-family: lobster-two, cursive;
 font-size: 20px;
}
```
These classes (`cursive-text-large` and `cursive-text-small`) are being used in our `handlebars` files.

You also need to add images in your `public` dir. The images are the being used in the `routes.js` file. You can see [this Github dir](https://github.com/amit-upadhyay-IT/fantastic-node-journey/tree/master/chapter6/example1_handlebars_eg/public) where I have a kept collection of images.

Now lets see the main file (app.js):

{: .unreleased .note}
**app.js code**<br>file path: `./app.js`

```js
var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var hbars = require('express-handlebars');

var handlers = require('./routes/routes.js');
var app = express();

app.set('view engine', 'handlebars');/*while using handlebars you need to write one more line which wasn't required when we were using ejs*/
app.engine('handlebars', hbars({defaultLayout:'layout'}));/*here we specify how handlebars should be initialized, its like when the first instance of handlebars is created do you want to init with something or not. If our application doesn't using any layout page then we pass empty object.*/

app.use(express.static(__dirname + '/public'));

// body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// session handling
app.use(session (
    {
        secret:"secret",
        resave:true,
        saveUninitialized:true
    }
));

/*
 * Note the object we are passing in the session constructor. Now our application is ready for session handling purpose.
 * secret: it is used to keep some secret value which is only known to the developer (it might be coming from the db or any reserve system). Basically this doesn't allow stealing of session.
 * resave: even if there is no change in the req, res value but still if we want to save it we make resave: true. It makes sure that the session always have correct data.
 * saveUninitialized; Actually I don't know why is it used. But for now I can tell that it accepts true or false.
 * */


app.get('/', handlers.loginPageHandler);

app.get('/logout', handlers.logoutHandler);

app.get('/toLanding', handlers.landingPageHandler);

app.post('/toCity', handlers.cityPageHandler);

app.use('*', function (req, res) {
    res.status(404);
    res.render('404.handlebars', {});
});

app.use(function (error, req, res, next) {
    console.log('Error : 500::' + error);
    res.status(500);
    res.render('500.handlebars', {err:error});
});


var port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Server is listening at port ' + port);
});

```


