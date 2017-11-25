---
title: Express template engines
permalink: /docs/express-template-engines-intro/
---


<div class="note">
  <h5>Express template engines</h5>
</div>

Now we will learn about some templates engines of Express, these are the templates which are used to create **dynamic HTML pages** on server side in node.js environment. We will also see twitter bootstrap(its a library which utilizes css, JavaScript and some images of its own to decorate your pages and provide some
interactivity to your pages). We will study JavaScript template engines, creating project using EJS template, Twitter bootstrap, How to **modularize** code by separating routes, using `EJS partials`.

Typically in a project environment you need to know multiple template engines because every engine has got its own strength and weaknesses. Mainly we will discuss on EJS template engine.

### JavaScript Template Engine

- EJS,
- Jade,
- Handlebars.

To build node.js web apps its important to understand how to use templates. We will see how to use `EJS`, `Jade` and `Handlebars`.

**Why you should know multiple template engines?**

As already mentioned that different template engines has different featured being offered, so for their convenient purpose people use them. And this brings you the fact that in real world you are most likely to work on different projects that use different template engines, so it becomes very important that you know how to work with different templates.

In any node.js application that we are writing to create a web server say your web based app is going to have 10 pages so you will be having 10 different paths to your application url.

**Example**:

`something.com/page1`,
`something.com/page2`, `...` so on.
And with different url user generally go to different pages and page navigation happens within the application itself. So far we are trying to create HTML page on the server side but it is very well possible that within your code itself you can write your HTML tags within “ ”.

Example:
```js
res.write(“<h1>HI</h1>”);
```

So this is one very crude way of sending a HTML to the end users. And this is where templates engine come in play and what they do is they provide a very nice way for creating HTML pages. In a typical HTML page that is seen on your browser you have static tags in which data is spread everywhere like some data you will find in tabular form which are written in <table> tag. So basically there are some structural elements of HTML and within that HTML page itself you have your data spread in some or other component of HTML page.

So what these template library do is that they allow you to create first create an HTML and within that HTML they allow you to put your JavaScript variables. And when the request comes to the server side then your express application executes the code to get data from database (or some other source) and then it
populates those JavaScript variables which are used in the HTML where you have provided some mechanism of referring to those variables. So that is how templates are made.

We can use the application generator tool to quickly create an application skeleton. We can use `express-generator` package which will let us easily generate the infrastructure for new projects. Since we are at the beginning of learning so we will not use application generator tools.

So right now I'm not going to tell about code generator now, though its a very small and easy thing to learn but once the code gets generated then you won't be able to understand what to change, why to change and things like that. So that's why we will be generating our code manually and once you become proficient with the template engines then we will generated the code and then make changes to the generated code to suite our needs.

### A bit about bootstrap
Twitter bootstrap is the technology which is used to decorate your pages mainly it allows you to write an application with css styling and little bit of inbuilt JavaScript based styling so that the same application without any distortion can be run on mobile devices also. So if your front end of your application is utilizing twitter bootstrap library then your pages will look nice on web as well as on the mobile devices. It is more
related to presentation/aesthetic part of your page. Also it gives you some beautiful components which are
by default not given in HTML. It utilizes jQuery library of JavaScript for creating those kind of components.
