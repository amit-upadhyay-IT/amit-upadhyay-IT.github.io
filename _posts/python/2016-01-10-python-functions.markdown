---
title: 'Python functions'
date: 2016-01-10 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---

A function is a named sequence of statement(s) that performs a computation. Function can be categorized as belongings to:

1. Modules function
1. Built in
1. User defined

### Function in modules

- A module is a file containing Python definitions (i.e. functions) and statements.
- Definitions from the module can be used within the code of a program.
- To use these modules in the program, a programmer needs to import the module. Once you import a module, you can reference (use), any of its functions or variables in your code.

Ways to import modules in program:

1. import
1. from

### import

It is simplest and most common way to use modules in our code.

Its syntax is:

```py
import modulename1 [,modulename2, ---------]
```

Example:

```py
>>> import math
```

On execution of this statement, Python will:

1. search for the file „math.py‟.
1. Create space where modules definition & variable will be created,
1. then execute the statements in the module.

Now the definitions of the module will become part of the code in which the module was imported.

Thank you 🎂 👏
