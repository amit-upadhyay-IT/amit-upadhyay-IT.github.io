---
title: 'Introduction to classes and objects'
date: 2016-03-03 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---

### Classes

It is basically a blueprint to create objects. An object is a basic key concept of OOP but classes provide an ability to generalize similar type of objects.


### Object

**Every object is characterised by**:

- **Identity**: This is the name that identifies an object.

- **Properties**: These are the features or attributes of the object.

- **Behaviour**: The behaviour of an object signifies what all functions an object can perform.


## Defining Classes

It encapsulates data and its associated functions. To define a class in Python, we need to just define the class and start coding. A Python class starts with the reserved word `class`, followed by the class name and a `colon(:)`.

Everything in a class is indented after the colon, just like the code within a function, if statement or for loop. The first thing not indented is not part of the class definition. A class may contain attributes which can be data members or/and member functions i.e. methods. In fact the word attribute is used for any name following a dot. Let us take the example of class Test:

```py
class Test:
	var = 50
	marks = 10
	def display():
		print var
```

In the above class definition, `marks`, `var`, `display()`, all are attributes of the class `Test` and also of all its `objects`. Similarly when we import modules, in the expression `module1.fuctionname`, `module1` is a module object and function name is a method but also referred to as an attribute of `module1`. The module's attributes and the global names are defined in the same namespace. Class definitions, like function definitions using def statements must be given before they are referenced for use. When a class definition is entered a new namespace is created and then used as local scope. Hence all assignments to the local variables are attached with this namespace.

Attributes of a class may be read-only or writable. In the latter case, assignment to attributes is possible. That means the following statement is valid:

```py
test1.marks=10
```

Writable attributes may also be deleted using the del statement. For example:

```py
del test1.marks
```

The above statement will remove the attribute marks from the object named test1.In fact the del statement removes the binding of the attribute (marks) from the namespace (test1) referenced by the class's local scope. When a class definition is left normally (via the end), a class object is created. This is basically a wrapper around the contents of the namespace created by the class definition.

Note that calling a method on an object can also change the object. This implies that an object is mutable. A function can modify an outer mutable object by calling a method on it.


Consider the example below:

```py
x= [10]
def List_ex():
	x.append(20)

def add_list():
	x=[30,40]
	x.append(50)

print x
list_ex()
print x
add_list()
print x
```

The above example prints
```
[10]
[10,20]
[30,40,50]
```
The `list_ex()` calls the append method of the `global x`, whereas the `add_list()`, `x` refers to a `local x`.

Also data attributes override method attributes with the same name. That means if the data attribute of the class and the method attribute are in same scope, then the data attribute will be given higher priority. So to avoid accidental name conflicts.

If the class does not contain any statements i.e. it is a class without any attributes or methods , then a keyword `pass` is given within the body of the class as shown below :

```py
class mobile:
	pass
```

In the above example `pass` is a keyword. Giving pass in the class definition means that the class doesn't define any methods or attributes. But since there needs to be something in the definition, so you use pass. It's a statement that does nothing.


### Constructors in Python (Using __init__)

In python, the built in method `__init__` is a sort of `constructor`. Notice the double underscores both in the beginning and end of `init`. In fact it is the first method defined for the class and is the first piece of code executed in a newly created instance of the class. But still it should also be remembered that the object has already been constructed by the time `__init__` is called, and you already have a valid reference to the new instance of the `class` through the first argument, `self` of the `__init__` method.

**Consider the following example:**

```py
class Initialize:
	int var
	def __init__(self, var=10): #double underscore before and after init
		Initialize.var=var
	def display():
	print var
```

`__init__` method can take any number of arguments, and just like functions, the arguments can be defined with default values, making them optional to the caller. Initial values for attributes can be passed as arguments and associated to attributes. A good practice is to assign them default values, even `None`. In this case, `var` has a default value of `10`. After the class definition, `object.__init__(self[, ...])` is called when the instance is created. The arguments are those passed to the class constructor expression. This means the statements given below will give the output 20.

```py
P = Initialize(20)
P.display()
```

Also note that if no argument was passed while creating the object, then the `__init__` would have taken the default value of var and the output would have been `10`.


Thank you 👏
