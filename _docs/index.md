---
title: Welcome
permalink: /docs/home/
redirect_from: /docs/index.html
---

This blog aims to be a comprehensive guide to Node.js. I’ll cover topics which will help you understand the core concepts more deeply and easily. There are different posts for differnt topics. The topics are categorized into chapters where I start from the basics and move towards high level view of Node.js.


<div class="note info">
  <h5>So what is Node.js, exactly?</h5>
  <p>The theory behing this technology. If you know "What is Node.js?" you may skip it.</p>
</div>

This is a technology in which JavaScript code is written, its not a new language. It is **JavaScript run-time engine** which allows you to write JavaScript code on the server side. It is built on **Chrome's V8** JavaScript engine. It is an open source, cross-platform runtime environment for networking applications.

When this language JavaScript was create then the only purpose of JavaScript was to run it within the boundaries of web browser. So basic objective of JavaScript was to manipulate DOM(Document Object Model) things of the web page. JavaScript has some beautiful features and because of that only
JavaScript was chosen to implement Node.js engine on the server side. Node.js made possible to run JavaScript on server side.

Rayn Dahl is the inventor of node.js. The way he started off was that he was using a photo sharing application called as fliker and he started uploading the picture to the server. He noticed that till the picture upload is completed the server wasn't able to respond to any other thing associated to that
particular client.

Idealy what happened was there was a service running in the background which was uploading a picture and he was trying to navigate between different page by clicking on the link. As the main thread of the application is occupied by the IO operation of getting the file from client to the server so the
other parts of the applications were blocked. So Rayn Dahl wanted to find a way where he can upload or do multiple processing at the same time without the main thread being blocked so that one should be able to do all the non-blocking operations simultaneously. Upon analysis he found out that any input/output operations that deals with saving/opening a file blocks the main thread.

During 2007-08 Google released its famous JavaScript engine (chrome's v8 engine), this engine is considered to be the fastest JavaScript engine as of today.

Node.js can be compared with the **JVM (Java Virtual Machine)**, JVM is run time environment for Java language. Similarly Node.js is run time environment for JavaScript language.

## Helpful Hints

Throughout this guide there are a number of small-but-handy pieces of
information that can make using this blog easier, more interesting, and less
hazardous. Here’s what to look out for.

<div class="note">
  <h5>ProTips™ help you get more from Binomial.me</h5>
  <p>These are tips and tricks that will help you be a Node.js wizard!</p>
</div>

<div class="note info">
  <h5>Notes are handy pieces of information</h5>
  <p>These are for the extra tidbits sometimes necessary to understand
     Node.js.</p>
</div>

<div class="note warning">
  <h5>Warnings help you not blow things up</h5>
  <p>Be aware of these messages if you wish to avoid certain death.</p>
</div>

<div class="note unreleased">
  <h5>You'll see this when you will be given an assignment to work.</h5>
  <p>A homework which you are required to solve by yourself.</p>
</div>

If you come across anything along the way that I haven’t covered, or if you
know of a tip you think others would find handy, please [file an
issue]({{ site.repository }}/issues/new) and I’ll see about
including it in this guide.
