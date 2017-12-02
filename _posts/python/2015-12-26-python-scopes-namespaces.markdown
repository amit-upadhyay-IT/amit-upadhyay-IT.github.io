---
title: 'Scopes and namespaces in python'
date: 2015-12-26 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---


### Namespaces

The variables refer to an object and they are created when they are first assigned a value. In fact the variables are bound to their values using the assignment operator(=). So a namespace is a place where a variable's name is stored and the value of the variable is bound to this namespace.

A namespace is a mapping from names to objects. It is a thing which associates the names with its values. In simple terms, it is a place where name lives. They are created at different moments and have different lifetimes. The examples of namespaces are:

- **Built-in names**:
These consist of functions such as `max()` , `min()` and `built-in exception names`. This namespace is created when the Python interpreter starts up, and is never deleted. The built-in names actually also live in a module called `__ builtin__`.

- **Global names in a module**:
The global namespace for a module is created when the module definition is read in and normally lasts until the interpreter quits. The statements executed by the top-level invocation of the interpreter, either read from a script file or interactively, are considered to be part of a module called `__main__` and they
have their own global namespace.

- **Local names in a function invocation**:
The local namespace for a function is created when the function is called, and deleted when the function returns or raises an exception that is not handled within the function. Even each recursive invocation has its own local namespace.

If we talk about classes and objects, the set of attributes of an object also form a namespace. It must be noted that there is absolutely no relation between names in different namespaces. Two different modules may both define same function without any confusion because the functions are prefixed with the module name. That means `module1.cmp()` has no relation with `module2.cmp()`.


## Scope Rules
A scope is a region of a Python program where a namespace is directly accessible. The location where the names are assigned in the code determines the scope of visibility of the name in that code. Although scopes are determined statically i.e. during creation of the program, yet they are used dynamically i.e. during execution of the program. At any time during execution, there are at least four main things to remember in the context of scope rules:

1. In Python, names of all types of variables are treated in same manner. That means numbers, strings, functions, types, modules, classes - all are treated in the same way. Also a name can refer to only one thing at a time. For example, consider the following program:

```py
var = 10 + 5
print var
def var(y):
	return y*10
	print var
var = "Hello"
print var
```
In the code given above, the variable `var` is bound to 15(10 + 5). Then `def var(y)` binds `var` to a function. The previous binding of var to 15 is lost and is replaced by the function. Thereafter `var` is bound to a `string`, so its binding with the function is no longer existing.

2. The scope of a variable is its enclosing `function` or `class` or `file(module)`. As discussed before, each name belongs to a namespace. For example, if a variable is created in a particular function, then its scope is that function only, since that function creates its own namespace where it resides. So any variable inside the function will be local to that `namespace`. In the following example, the scope of the variable x is the test function.


```py
def test():
	x = 5
	print x
```
Now let us modify the program -
```py
x = 10
def exam():
	print x

def test():
	x = 5
	print x

def marks(x):
	print x

print x
exam()
test()
marks(20)
```
On executing the above code, the output will be
```
10
10
5
20
```

The first line creates a variable `x` that belongs to the namespace of the file, so its scope is the entire file. Hence 10 is displayed. The exam function creates its namespace, but that namespace doesn't have an `x` in it. As Python doesn't find `x` there, it checks the next larger enclosing namespace and finds `x`. So exam uses the variable x defined at the top and displays 10.

However, the test function defines its own variable named x with value 5, which has higher priority over the first definition of x. So any mention of x within the test function will refer to that x, hence displaying 5. The marks function also has an x in its own namespace, just like test function has. So x gets bound to whatever value is passed as an argument to marks function (20 in the given example). Hence the outer x is shadowed again in this function displaying the output as 20.

3. The names always belong to the namespace where they are bound, irrespective of whether they are bound before or after they are referred. This is the reason which makes Python a lexically scoped language. The variable scopes are determined entirely by the locations of the variables in the source code of your program files, not by function calls. If a binding for a variable appears anywhere inside a function, the variable name is local to that function. Let us understand this with the help of an example:


```py
x = 10
def func1():
	x=50
	print x


def func2():
	print x
	x=25

	
def func3(p):
	if p<10:
		x=2
	print x


func1()
func2()
func3(20)
func3(5)
```
In the above example, the func1 function creates a local variable x in its own namespace, shadowing the outer variable x. So the line print x prints 50. The func2 function also has a local variable x in its namespace but the assignment to x is after the print statement. The local variable x shadows the outer x,
even though the local x is initially not bound to anything. The line print x looks for x in the local namespace, finds that it is not bound to anything, and so the reference to x leads to an error (an Unbound Local Error occurs). Similarly, in func3(), the variable x is local.

When we call func3(20), the line x = 2 is not executed, so print x causes an error. But when we call func3(5), the line x = 2 is executed , so print x prints 2.

4. Names declared with global keyword have to be referred at the file level. This is because the global statement indicates that the particular variable lives in the global scope. If no global statement is being used, the assignment to the name is always in the innermost local scope. Consider the following example:

```py
x=5
def func1():
	x=2
	x=x+1

def func2():
	global x
	x=x+1

print x
func1()
print x
func2()
print x
```

The above example prints `5`; then calling `func1()` it prints `3`. This is because `func1` only increments a local `x`. Then `func2()`increments the `global x` and prints `6`.

### LEGB Rule

From the examples discussed above, we come up to the LEGB rule. According to this rule, when a name is encountered during the execution of the program, it searches for that name in the following order:

- **L. Local** - It first makes a local search i.e. in current def statement. The import statements and function definitions bind the module or function name in the local scope. In fact, all operations that introduce new names use the local scope.

- **E. Enclosing functions** - It searches in all enclosing functions, form inner to outer.

- **G. Global (module)** - It searches for global modules or for names declared global in a def within the file.

- **B. Built-in (Python)** - Finally it checks for any built in functions in Python.

The examples given above give the output according to the LEGB rule only.


Thank you 🎂 👏
