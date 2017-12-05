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

Also note that if no argument was passed while creating the object, then the `__init__` would have taken the default value of var and the output would have been `10`. In Python, the first argument of every class method, including `__init__`, is always a reference to the current instance of the class and by convention, this argument is always named `self`. In case of `__init__`, `self` refers to the newly created object or the instance whose method was called. 
Note that the `__init__` method never returns a value.


### Importance of self

Class methods have only one specific difference from ordinary functions - they must have an extra argument in the beginning of the parameter list. This particular argument is `self` which is used for referring to the `instance`. But you need not give any value for this parameter when you call the method. Python provides it automatically. `self` is not a `reserved` word in Python but just a strong naming convention and it is always convenient to use conventional names as it makes the program more readable. So while defining your class methods, you must explicitly list `self` as the first argument for each method, including `__init__`.

To understand why you don't need to give any value for `self` during the method call, consider an example. Say you have a class called `My_Photo` and an instance of this class called `My_Object`. When you call a method of this `object` as `My_Object.method(arg1, arg2)`, this is automatically converted by Python into `My_Photo.method(My_Object, arg1, arg2)`. This feature makes `self` special and it also implies that if you have a method which takes no arguments, then you still have to define the method to have a `self` argument.

Self is an instance identificator and is required so that the statements within the methods can have automatic access to the current instance attributes. Here is the example showing a class definition using `__init__` and `self.

```py
class Mobile:

	price = 0
	model = "Null"

	def __init__(self, price, model = None):
		self.price=price
		self.model="Nokia Lumia 720"

	def displaydata(self):
	print self. price, self. model
```

**In the above example:**

- The variables `price` and `model` are the class variables whose value would be shared among all instances of this class. This can be accessed as `Mobile.price`, `Mobile.model` from inside the class or outside the class.

- The first method `__init__()` is a special method, which is called class `constructor` or `initialization` method that Python calls when you create a new instance of this class.

- You declare other class methods like normal functions with the exception that the first argument to each method is `self`. While giving a call to the method, the instance name is automatically taken as the first argument for `self`.

If after the given class definition of class Mobile, the following statements are executed

```py
M= Mobile(1000, 'Samsung')
M.displaydata()
```

the output is
```
1000 Samsung
```

### Class instances (Objects)

In fact after the class definition is made, a class instance is created automatically once the definition is left normally i.e. the indentation of statements is removed and the class object is called. All the instances created with a given class will have the same structure and behaviour. They will only differ regarding their state, i.e regarding the value of their attributes.

Classes and instances have their own namespaces, that is accessible with the dot ('.') operator. These namespaces are implemented by dictionaries, one for each instance, and one for the class. A class object is bound to the class name given in the class definition header. A class object can be used in two ways - by Instantiation and attribute references.

**1. Instantiation: Creating instance objects**

To create instances of a class, you call the class using class name and pass in whatever arguments its
`__init__` method accepts.
```py
Test = T(1,100)
```
In the above example `T` is the instance of class Test.

**2. Attribute Reference: Accessing attributes of a class**

```py
Object Name. Attribute Name
```

As discussed before all the names that were given during the class definition and hence were in the
class's namespace are valid attribute names.

Example:

```py
test.display()
unit_test.display()
print "Marks =", test. marks
```

**The search for the referenced attribute is done in the following sequence:**

a) A class instance has a namespace implemented as a dictionary which is the first place in which attribute references are searched.

b) When an attribute is not found there, and the instance's class has an attribute by that name, the search continues with the class attributes.

c) If no class attribute is found, the object's `__getattr__()` method is called to satisfy the lookup. You will study about this method later in the chapter.

Attribute assignments and deletions update the instance's dictionary, never a class's dictionary. If the class has a `__setattr__()` or `__delattr__()` method, this is called instead of updating the instance dictionary directly. You will learn about these methods later in this chapter.


### Class Atttributes v/s Instance Attributes

Attributes can be classified into - Class Attributes and Instance attributes.

**Class Attributes**

These belong to the class itself. These attributes will be shared by all the instances. Such attributes are defined in the class body part, usually at the top, for legibility. Consider the following example:


Example:

```py
class Health_profile:
		...
	weight = 89
	blood_group= 'B+'
	...

# To access this attribute, you use the dot notation:
>>> Health_profile.weight
89
>>> Health_profile.blood_group
B+
```

### Instances attributes

As we have learnt, a class may define attributes for its instances. These are called instance attributes and they belong to each instance/object of a class. For example, for the class Health_profile given above, let H1 be an instance. So, the attributes of H1, such as the weight, are directly available through the dot operator:

```py
>>>H1.weight
89
```

The dictionary for the instance attributes is also accessible by its `__dict__` variable about which you will learn in the next section. To list the attributes of an instance, we have two functions:

i) `vars()` : This function displays the attributes of the instance in the form of a dictionary. Consider the following example:

```py
>>>vars(H1)
{'weight': '89', 'blood group': 'B+'}
```

ii) `dir()`: This function lists more attributes than vars()because it is not limited to the dictionary of instance. It also displays the class attributes.

For example
```py
>>>dir(H1)
['__doc__', '__init__', '__module__', 'weight', 'blood_group',]
```

You can add, remove or modify attributes to an instance that were not defined by the class, such as the height in the following:

```py
>>> H1.height = 197 # adds 'height' as attribute
>>>  vars(H1)
{'weight': '89', 'blood group': 'B+',height='197'}
>>>H1. height=180 #modifies the value of height
>>> vars(H1)
{'weight': '89', 'blood group': 'B+',height='180'}
>>> del H1.height #deleted the attribute height
>>> vars(H1)
{'weight': '89', 'blood group'}
```

Here it should always be remembered that this feature of adding and deleting attributes should be used carefully, since by doing this, you start to have instances that have different behaviour than that is specified in the class.

### Adding methods dynamically

As you can add, modify and delete the attributes of a class dynamically i.e. at run time, similarly, you can add methods dynamically to an object or class. Consider the code given below:

```
pyclass Health_profile:
		...
		weight = 89
		blood_group= 'B+'

	def play():
		print " Come on lets play"

	H=Health_profile()
	H.play=play()
	H.play()
```

In the above example, play is just a function which does not receive `self`. There is no way by which `H` can know that play is a method. If you need `self`, you have to create a method and then bind it to the object. For this you have to import `MethodType` from `types` module as shown in the example below:


```py
from types import MethodType
class Health_profile(object):
		weight = 89
		blood_group= 'B+'

	def __init__(self,name):
		self.name=name

	def play():
		print " Come on lets play", self.name

	H=Health_profile("Shalini")
	H.play=MethodType(play,H)
	H.play()
```

In the above code, the built in function `MethodType` from the `types` module takes two arguments - the `name` of the function which has to be bound dynamically and the `instance` with which it has to bind the function. In the above example the `play` method will be bound only with the instance, `H`. No other instances of the class `Health_profile` will have `play` method. If we want the other instances also to have play method, then we have to add the method to the class and for that we make use of `self` as shown in the example below:

```py
class Health_profile(object):
		weight = 89
		blood_group= 'B+'

	def __init__(self,name):
		self.name=name

	def play(self):
		print " Come on lets play", self.name

	Health_profile.play=play()
	H1=Health_profile("Shalini")
	H1.play()
	H2=Health_profile("Ritu")
	H2.play()
```

In the above example, note that no method is created with `types.MethodType`. This is because all functions in the body of the class will become methods and receive self unless you make it a `static` method.



Thank you 👏
