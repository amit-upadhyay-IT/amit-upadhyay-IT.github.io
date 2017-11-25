---
title: Custom calculator
permalink: /docs/calc_app/
---

## Calculator module example

This particular module is like a utility for my application.

It's upto you how you design the module, here I created Object notation.


<div class="note">
  <h5>Custome module:</h5>
  <p>Example of custom module which can be imported into other files and it's apis can be used there by simple function calls.</p>
</div>

```js
var CALC = {

    add : function(a, b){
        return a+b;
    },

    sub : function(a, b){
        return a-b;
    },

    mul : function(a, b){
        return a*b;
    },

    div : function(a, b){
        return a/b;
    }
};

module.exports = CALC;
```


