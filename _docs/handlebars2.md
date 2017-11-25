---
title: Handlebars Engine part 2
permalink: /docs/handlebars2/
---

Now after writing the different routes to the applicatoin, lets write the `views`. As we have seen in the `routes.js` that we need `login.handlebars`, `landingpage.handlebars`, `city.handlebars`. We may also need a default layout, so for that I will also create `layout.handlebars` this will get open when the handlebars will get initialized for the first time.

Lets say that we have seperated the common code from `login.handlebars`, `landingpage.handlebars` and `city.handlebars` and put them into `partials`, so for that we write different handlebars in `partials` too. Below are the code snippets.

**NOTE**: The front-end is made using bootstrap(don't hesitate whenever you see stylesheet files from bootstrap).

{: .unreleased .note}
**partials code**<br>file path: `./views/partials/includeHead.handlebars`

```html
<meta charset="utf-8">
<title>The Earth Hub</title>
<link rel="icon" href="/images/favicon.ico" type="image/x-icon">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
<link  type="text/css" rel="stylesheet"  href="/styles.css" />
<script src="https://use.edgefonts.net/lobster-two.js"></script>

```

{: .unreleased .note}
**partials code**<br>file path: `./views/partials/includeMenu.handlebars`

```html
<div class="container">
<header>
<h2 class="cursive-text-large" align="center"> The Transport Hub </h2>
</header>
</div>
<div class="navbar navbar-inverse ">
      <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar" ></span>
              <span class="icon-bar" ></span>
              <span class="icon-bar" ></span>
           </button>
          </div>

          <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
              { {#if LOGGEDIN}}
                <li><a href="/toLanding"><span class="glyphicon glyphicon-random"> Hub</span></a></li>
                <li><a href="/logout"><span class="glyphicon glyphicon-log-out"> Logout</span></a></li>  
              { {else}}
                <li><a href="/"><span class="glyphicon glyphicon-log-in"> Login</span></a></li>
              { {/if}}
              </ul>
          </div>
      </div>
</div>
```

{: .unreleased .note}
**partials code**<br>file path: `./views/partials/includeFoot.handlebars`

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
```

{: .unreleased .note}
**views code**<br>file path: `./views/city.handlebars`

```html
<div class="container">
<h3 class="cursive-text-small" align="center">Hi { {welcomeMessage}}!, You are in the city of { {cityName}}. { {tagline}}.</h3>
  <div class="row">
    { {#each imageArray}}
       <div class="col-md-6">
          <img src="/images/{ {../cityName}}{ {this}}.jpg" 
          width="400" 
          class="img-circle"/>
       </div>
    { {/each}}
  </div>
</div> 
```


{: .unreleased .note}
**views code**<br>file path: `./views/landingpage.handlebars`

```html
<div class="container">
  <div class="row">
    <div class="col-md-6 col-md-offset-0 panel panel-default">
      <p class="help-block text-center cursive-text-small">
          Hi { {welcomeMessage}}!, Depending on your interest, I'll take you to a city.  
      </p>
      <form class="margin-base-vertical" method="post" action="/toCity" role="form">
        <div class="form-group"> 
          <label for="interest" class="cursive-text-small">What's your interest?</label>
          <select  required class="form-control" name="interest" id="interest" >
            <option value="finance">Business</option>
            <option value="fashion">Fashion</option>
            <option value="history">History</option>
          </select>
        </div>
        <p class="text-center">
          <button type="submit" class="btn btn-success btn-lg">Submit</button>
        </p>
      </form>
    </div>
  </div>
</div>
```

{: .unreleased .note}
**views code**<br>file path: `./views/login.handlebars`

```html
<div class="container">
  <div class="row">
    <div class="col-md-4 col-md-offset-0 panel panel-default">
      <h1 align="center" class="margin-base-vertical">Sign In</h1>
      <form class="margin-base-vertical" method="get" action="/toLanding">
        <p class="input-group ">
          <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
          <input type="text" required class="form-control input-lg" name="nm" placeholder="username" />
        </p>
        <p class="help-block text-center">
          <small>Please login to use the Transport Hub</small>
        </p>
        <p class="text-center">
          <button type="submit" class="btn btn-success btn-lg">Sign-In</button>
        </p>
      </form>
    </div>
  </div>
</div>
```

Now we may also need to handle `404` and `500` errors on page. Thus lets make two more handlebars.

{: .unreleased .note}
**views code**<br>file path: `./views/404.handlebars`

```html
 <div class="container">
   <div class="row">
    <div align="center">
        <blockquote class="mainLines">
          <code> The page you are looking for is not available or may have been moved.</code>
        We actually don't want anyone to see this message, it feels very embarrassing.
        </blockquote>
    </div>
    <br/>
    </div>
 </div>
```

{: .unreleased .note}
**views code**<br>file path: `./views/500.handlebars`

```html
 <div class="container">
   <div class="row">
    <div align="center">
        <blockquote class="mainLines">
            <code>Oh! something went wrong as you tried to access this page</code>
                  Probably this happened because there are some bugs in the application
        </blockquote>
        <blockquote class="mainLines">
                  { {err}}
        </blockquote>
    <br/>
   </div>
  </div>
 </div>
```

Now lets see the `layout` file.

{: .unreleased .note}
**layouts code**<br>file path: `./views/layouts/layout.handlebars`

```html
<html>
<head>
  { {>includeHead}}
</head>
<body>
  { {>includeMenu}}
  
  { { {body}}}
  { {>includeFoot}}
</body>
</html>
```

Next you will see the `public` dir.
