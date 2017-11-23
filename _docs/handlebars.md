---
title: Handlebars Engine part 1
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

**NOTE**:
- Use double curly braces when you want to escape HTML.
- Use triple curly braces when you don’t want to escape HTML.

Handlebars is a bit similar to EJS template engine in structure and uses HTML markup syntax. Handlebars offers built in helpers and you can create your own helpers, Handlebars offers partials which allow for code reuse.

Handlebars comes with some very useful built in helpers like `each`, `with`, `if`, `unless` etc. `each` helper is used to `loop` through array elements.

Lets write an application using Handlebars. Handlebars syntax is little simpler than Jade.


{: .note}
**What our application will do?**<br>It will first ask for user login, after the the user will be directed to a page where he/she can enter the choice about which they wanna know. After that they will be directed to page about the info.


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

Now I think I have download the required libraries. Now lets start coding the app.

First lets create the different routes to the application. The different routes might be: `/`, `/toLanding`, `/logout`, `/toCity`.

- `/`: I would like to show the login option.
- `/toLanding`: the page after the user is loggedin.
- `/toCity`: Once the user selects option from the toLanding page.
- `/logout`: When the user wants to logout.


{: .unreleased .note}
**Routes code**<br>file path: `./routes/routes.js`

```js
exports.loginPageHandler = function (req, res) {
    res.render('login.handlebars', {});
}

exports.logoutHandler = function (req, res) {
    req.session.destroy(); // destroys data saved in session object.

    res.render('login.handlebars', {LOGGEDIN:false});
}

exports.landingPageHandler = function (req, res) {
    req.session.loggedin = true;

    var person;

    if (req.session.userNmae) {
        console.log('User name already in session. It is ' + req.session.UserName);
        person = req.session.userName;
    }
    else
    {
        person = req.query.nm;
        req.session.userName = person;
        console.log('User name doesn\'t exists in session. Hence storing it in session store ' + person);
    }

    res.render('landingpage.handlebars', {
        welcomeMessage:person,
        LOGGEDIN:req.session.loggedin
        }
    );
}

exports.cityPageHandler = function (req, res) {
    var interestValue = req.body.interest; /*this is a post request thus I am using body instead of params*/
    var cityNameValue, taglineValue;

    console.log('received interestValue as ' + interestValue);
    var imageArray = [];

    if (interestValue === 'history')
    {
        cityNameValue = 'Rome';
        taglineValue = 'The city of earliest civilization';
        imageArray = [1, 2];
    }
    else if (interestValue === 'fashion')
    {
        cityNameValue = 'Paris';
        taglineValue = 'The fashion capital of the world';
        imageArray = [1, 2, 3];
    }
    else if (interestValue = 'finance')
    {
        cityNameValue = 'New York';
        taglineValue = 'The business capital of World';
        imageArray = [1, 2, 3, 4, 5, 6];
    }

    res.render('city.handlebars', {
        cityName:cityNameValue,
        tagline:taglineValue,
        welcomeMessage:req.session.userName,
        imageArray:imageArray,
        LOGGEDIN:req.session.loggedin
        }
    );
}
```



