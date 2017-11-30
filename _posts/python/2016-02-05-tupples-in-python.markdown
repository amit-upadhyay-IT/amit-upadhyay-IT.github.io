---
title: 'Tuple in python'
date: 2016-02-05 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---


{: .info .note}
**What is a Tuple?**<br>A tuple is a sequence of values, which can be of any type and they are indexed by integer. Tuples are just like list, but we can’t change values of tuples in place. Thus tuples are immutable. The index value of tuple starts from `0`.

A tuple consists of a number of values separated by commas.

For example:

```py
>>> T=10, 20, 30, 40
>>> print T
(10, 20, 30, 40)
```

But in the result, same tuple is printed using parentheses. To create a tuple with single element, we have to use final comma. A value with in the parenthesis is not tuple.

Example:

```py
>>> T=(10)
>>> type(T)
<type 'int'>

>>> t=10,
>>> print t
(10,)

>>> T=(10,20)
>>> type(T)
<type 'tuple'>
```

Example:

```py
# Tuple with string values
>>> T=('sun','mon','tue')
>>> print T
('sun', 'mon', 'tue')

# Tuples with single character
>>> T=('P','Y','T','H','O','N')
>>> print T
('P', 'Y', 'T', 'H', 'O', 'N')
```

### Tuple Creation

If we need to create a tuple with a single element, we need to include a final comma.


```py
Example
>>> t=10,
>>> print t
(10,)
```

Another way of creating tuple is built-in function `tuple()`.

Syntax:
```py
T = tuple()
```

Example:

```py
>>> T=tuple()
>>> print T
()
```

### Add new element to Tuple

We can add new element to tuple using `+` operator.


Example:
```py
>>> t=(10,20,30,40)
>>> t+(60,)
# this will not create modification of t.
(10, 20, 30, 40, 60)
>>> print t
(10, 20, 30, 40)
>>> t=t+(60,) # this will do modification of t.
>>> print t
(10, 20, 30, 40, 60)
```

**Example**

#### Write a program to input `n` numbers and store it in tuple.

Code
```py
t=tuple()
n=input("Enter any number")
print " enter all numbers one after other"
for i in range(n):
	a=input("enter number")
	t=t+(a,)
print "output is"
print t
```

Another version of the above program:

```py
t=tuple()
n=input("Enter any number")
print " enter all numbers one after other"

for i in range(n):
	a=input("enter number")
	t=t+(a,)

print "output is"
for i in range(n):
	print t[i]
```

We can also add new element to tuple by using `list`. For that we have to convert the tuple into a list first and then use `append()` function to add new elements to the list. After completing the addition, convert the list into tuple. Following example illustrates how to add new elements to tuple using a list.


```py
>>> T=tuple() #create empty tuple
>>> print T
()
>>> l=list(T) #convert tuple
into list
>>> l.append(10) #Add new elements to list
>>> l.append(20)
>>> T=tuple(l)
#convert list into tuple
>>> print T
(10, 20)
```

Initializing tuple values:
```py
>>> T=(0,)*10
>>> print T
(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
```

### Tuple Assignment

If we want to interchange (swap) any two variable values, we have to use temporary variable.

Example:

```py
>>> A=10
>>> B=20
>>> print A,B
10 20
>>> T=A
>>> A=B
>>> B=T
>>> print A,B
20 10
```

But in python, **tuple assignment** is more elegant:

Example:

```py
>>> T1=(10,20,30)
>>> T2=(100,200,300,400)
>>> print T1
(10, 20, 30)
>>> print T2
(100, 200, 300, 400)
>>> T1,T2=T2,T1
# swap T1 and T2
>>> print T1
(100, 200, 300, 400)
>>> print T2
(10, 20, 30)
```

The left side is a tuple of variables, while the right side is a tuple of expressions. Each value is assigned to its respective variable. All the expressions on the right side are evaluated before any of the assignments. The number of variables on the left and the number of values on the right have to be the same:

Example
```py
>>> t1 = (10, 20, 30)
>>> t2 = (100, 200, 300)
>>> t3 = (1000, 2000, 3000)
>>> t1, t2 = t2, t1, t2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: too many values to unpack
```
Here, two tuples are in the left side and three tuples are in right side. That is why, we get errors. Thus, it is required to have same number of tuples in both sides to get the correct result.

Example
```py
>>> T1,T2,t3=t3,T1,T2
>>> print T1
(1000, 2000, 3000)
>>> print T2
(10, 20, 30)
>>> print t3
(100, 200, 300)
```

### Tuple Slices

Slice operator works on Tuple also. This is used to display more than one selected value on the output screen. Slices are treated as boundaries and the result will contain all the elements between boundaries.

Syntax is:
```py
Seq = T [start: stop: step]
```

Where `start`, `stop` & `step` all three are optional. If we omit first index, slice starts from `0`. On omitting stop, slice will take it to `end`. Default value of step is `1`.

Example
```py
>>> T=(10,20,30,40,50)
>>> T1=T[2:4]
>>> print T1
(30, 40)
```
In the above example, starting position is `2` and ending position is `3 (i.e. 4-1)`, so the selected elements are `30` & `40`.

```py
>>> T[:]
(10, 20, 30, 40, 50) # Will produce a copy of the whole tuple.

>>> T[::2]
(10, 30, 50) # Will produce a Tuple with every alternate element.

>>> T[:3]
(10, 20, 30) # Will produce 0 to 2(3-1)

>>> T[2:]
(30, 40, 50) # Will produce from 2 to end.
```

### Tuple Functions

#### cmp()

This is used to check whether the given tuples are same or not. If both are same, it will return `zero`, otherwise return `1` or `-1`. If the first tuple is big, then it will return `1`, otherwise return `-1`.

Syntax:
```py
cmp(t1,t2) # t1and t2 are tuples.
```
returns 0 or 1 or -1

Example
```py
>>> T1=(10,20,30)
>>> T2=(100,200,300)
>>> T3=(10,20,30)
>>> cmp(T1,T2)
-1
>>> cmp(T1,T3)
0
>>> cmp(T2,T1)
1
```

#### len()

It returns the number of items in a tuple.

**Syntax**:
```py
len(t) # t tuples
```
returns number of items in the tuple.

Example
```py
>>> T2=(100,200,300,400,500)
>>> len(T2)
5
```

#### max()

It returns its largest item in the tuple.

**Syntax**:
```py
max(t) # t tuples
```
returns maximum value among the given tuple.

Example
```py
>>> T=(100,200,300,400,500)
>>> max(T)
500
```

#### min()

It returns its smallest item in the tuple.

**Syntax**:
```py
min(t) #t tuples
```
returns minimum value among the given tuple.

Example
```py
>>> T=(100,200,300,400,500)
>>> min(T)
100
```

#### tuple()

It is used to create empty tuple.

**Syntax**:
```py
T=tuple() #t tuples
```
Create empty tuple.

Example
```py
>>> t=tuple()
>>> print t
()
```

Thank you 👏
