---
title: 'Get familiar with lists'
date: 2016-02-03 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---


{: .info .note}
**What is a list**<br>Like a String, list also is sequence data type. It is an ordered set of values enclosed in square brackets []. Values in the list can be modified, i.e. it is mutable.

For accessing an element of the list, indexing is used.

Syntax: 
```py
listName[index] #(variable name is name of the list).
```

Index here, has to be an integer value- which can be positive or negative. Positive value of index means counting forward from beginning of the list and negative value means counting backward from end of the list. Remember the result of indexing a list is the value of type accessed from the list.

Let's look at some example of simple list:

```sh
>>> L1 = [1, 2, 3, 4] # list of 4 integer elements.

>>> L2 = [“Delhi”, “Chennai”, “Mumbai”] #list of 3 string elements.

>>> L3 = [ ] # empty list i.e. list with no element

>>> L4 = [“abc”, 10, 20] # list with different types of elements

>>> L5 = [1, 2, [6, 7, 8], 3] # A list containing another list known as nested list
```

To change the value of element of list, we access the element & assign the new value.

Example:

```sh
>>> print L1 # let‟s get the values of list before change
>>> L1 [2] = 5
>>> print L1 # modified list
[1, 2, 5, 4]
```

> **NOTE**: An Index Error appears, if you try and access element that does not exist in the list.

## Creating a list

List can be created in many ways:

i) By enclosing elements in [ ], as we have done in above examples.

ii) Using other Lists

Example:

```py
L5=L1 [:]
```
Here L5 is created as a copy of L1.

```sh
>>>print L5
L6 = L1 [0:2]
>>>print L6
# will create L6 having first two elements of L1.
```

iii) List comprehension:

Example:
```sh
>>> S= [x**2 for x in range (10)]
>>> print S
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

In mathematical terms, `S` can be defined as `S = {x 2 for: x in (0.....9)}`. So, we can say that list comprehension is short-hand for creating list.


iv) Using built-in object

`L = list ()` will create an empty list.

or

`L = list [(1, 2, 3, 4)]`

> A single new list is created every time, you execute [ ]. We have created many different lists each using [ ]. But if a list is assigned to another variable, a new list is not created.

Example:
```py
A = []
B = A # Will also create one list mapped to both
C = []
```

You can try to check the address of A and B.

```py
if id(A) == id(B):
  print 'yes'

# printing the address
print hex(id(A))
print hex(id(B))
```







Thank you 👏
