---
title: Custom Async APIs
permalink: /docs/05making_async_api/
---


## Make your own api with a callback (i.e. async)

By now you must have thought of writing your own custom asynchronous function. Even I was very curious to make a custom asnyc function.

JavaScript itself is synchronous and single-threaded. You cannot write an asynchronous function; plain JS has no timing API. There will be no side-effects from parallel threads. What you can do is use some APIs provided by your environment (Node.js, Webbrowser) that allow you to schedule asynchronous tasks - using timeouts, ajax, FileAPI, requestAnimationFrame, nextTick, WebWorkers, DOM events, whatever.

Example:

```js
function printWorld()
{
    setTimeout (function (){
        console.log('World');
    }, 1000);
}
printWorld();
console.log('Hello'); // this gets printed first because the above function is pushed into the event queue (not onto the call stack)
```

Example 2:

What output would you expect from this?

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 2000);
}
```

NOTE:

Only native functions (with access to the event loop) are asynchronous. You would need to call one of them to get asynchronity for your callback. 

----------------------------------------------------------------------------------------

Since ES6 there are promises as an asynchronous primitive built into plain JavaScript, so you can do

```js
 Promise.resolve("World").then(console.log); // then callbacks are always asynchronous
 console.log("Hello");
```


