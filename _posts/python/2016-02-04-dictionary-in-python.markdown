---
title: 'Dictionary in python'
date: 2016-02-04 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---


{: .info .note}
**What is a dictonary?**<br>A dictionary is like a list, but more in general. In a list, index value is an integer, while in a dictionary index value can be any other data type and are called keys.

The key will be used as a string as it is easy to recall. A dictionary is an extremely useful data storage construct for storing and retrieving all key value pairs, where each element is accessed (or indexed) by a unique key. For accessing an element of the list, indexing is used. However, dictionary keys are not in sequences and hence maintain no left-to right order.

{: .warning .note}
**Are the key always a string as we have in JSON key-value pair? Think about it.**

### What is a Key-value pair?

We can refer to a dictionary as a mapping between a set of indices (which are called keys) and a set of values. Each key maps a value. The association of a key and a value is called a key-value pair.

**Syntax**:

```py
my_dict = {'key1': 'value1','key2': 'value2','key3': 'value3'...'keyn': 'valuen'}
```

> Note: Dictionary is created by using curly brackets(ie. {}).

#### Example 1:

```py
>>> A={1:"one",2:"two",3:"three"}
>>> print A
{1: 'one', 2: 'two', 3: 'three'}
```
In the above example, we have created a list that maps from numbers to English words, so the keys values are in numbers and values are in strings.

#### Example 2:

```py
>>>computer={'input':'keybord','output':'mouse','language':'python','os':'windows-8',}
>>> print computer
{'input': 'keyboard', 'os': 'windows-8', 'language': 'python', 'output': 'mouse'}
```

In the above example, we have created a list that maps from computer related things with example, so here the keys and values are in strings. The order of the `key-value` pairs is not in same order (ie. input and output orders are not same). We can get different order of items in different computers. Thus, the order of items in a dictionary is unpredictable.

#### Example 3:

```py
>>> D={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> print D
{'wed': 'Wednesday', 'sun': 'Sunday', 'thu': 'Thursday', 'tue': 'Tuesday', 'mon':'Monday', 'fri': 'Friday', 'sat': 'Saturday'}
```


## Why is dictionary un-ordered?

- The order is not arbitrary, but depends on the insertion and deletion history of the dictionary or set, as well as on the specific Python implementation.

- Sets are implemented as dictionaries with just keys and no values.

- Keys are hashed, and hash values are assigned to slots in a dynamic table (it can grow or shrink based on needs). And that mapping process can lead to collisions, meaning that a key will have to be slotted in a next slot based on what is already there.

- Listing the contents loops over the slots, and so keys are listed in the order they currently reside in the table.

- Take the keys `foo` and `bar`, for example, and lets assume the table size is 8 slots. In Python 2.7, `hash('foo')` is `-4177197833195190597`, `hash('bar')` is `327024216814240868`. Modulo 8, that means these two keys are slotted in slots 3 and 4 then:

```py
>>> hash('foo')
-4177197833195190597
>>> hash('foo') % 8
3
>>> hash('bar')
327024216814240868
>>> hash('bar') % 8
4
```

This informs their listing order:

```py
>>> {'bar': None, 'foo': None}
{'foo': None, 'bar': None}
```

All slots except 3 and 4 are empty, looping over the table first lists slot 3, then slot 4, so `foo` is listed before `bar`.


`bar` and `baz`, however, have hash values that are exactly 8 apart and thus map to the exact same slot, 4:


```py
>>> hash('bar')
327024216814240868
>>> hash('baz')
327024216814240876
>>> hash('bar') % 8
4
>>> hash('baz') % 8
4
```

Their order now depends on which key was slotted first; the second key will have to be moved to a next slot:

```py
>>> {'baz': None, 'bar': None}
{'bar': None, 'baz': None}
>>> {'bar': None, 'baz': None}
{'baz': None, 'bar': None}
```

The table order differs here, because one or the other key was slotted first. The technical name for the underlying structure used by CPython (the most commonly used Python implemenation) is a hash table, one that uses open addressing.

****

{: .info .note}
**You should probably watch these videos about how CPython `dict` works**


<div class="videoWrapper" >
     <iframe width="854" height="480" src="https://www.youtube.com/embed/C4Kc8xzcA68" frameborder="0" gesture="media" allowfullscreen></iframe>
</div>

<br>

<div class="videoWrapper" >
     <iframe width="854" height="480" src="https://www.youtube.com/embed/66P5FMkWoVU" frameborder="0" gesture="media" allowfullscreen></iframe>
</div>


Note that as of Python 3.3, a random hash seed is used as well, making hash collisions unpredictable to prevent certain types of denial of service (where an attacker renders a Python server unresponsive by causing mass hash collisions). This means that the order of a given dictionary is then also dependent on the random hash seed for the current Python invocation.

Python 2.7 and newer also provides an [OrderedDict class](https://docs.python.org/2/library/collections.html#collections.OrderedDict), a subclass of dict that adds an additional data structure to record key order. At the price of some speed and extra memory, this class remembers in what order you inserted keys; listing keys, values or items will then do so in that order. It uses a doubly-linked list stored in an additional dictionary to keep the order up-to-date efficiently.


## Creation, initializing and accessing the elements in a Dictionary


The function `dict()` is used to create a new dictionary with no items. This function is called `built-in` function. We can also create dictionary using `{}`.

```py
>>> D=dict()
>>> print D
{}
```

`{}` represents empty string. To add an item to the dictionary (empty string), we can use square brackets for accessing and initializing dictionary values.

Example:

```py
>>> H=dict()
>>> H["one"]="keyboard"
>>> H["two"]="Mouse"
>>> H["three"]="printer"
>>> H["Four"]="scanner"
>>> print H
{'Four': 'scanner', 'three': 'printer', 'two': 'Mouse', 'one': 'keyboard'}
```


### Traversing a dictionary

This can be done by using `for-loop`.

Example:

code

```py
H={'Four': 'scanner', 'three': 'printer', 'two': 'Mouse', 'one': 'keyboard'}
for i in H:
print i,":", H[i]," ",
```

output:

```py
Four: scanner
one: keyboard
three: printer
two: Mouse
```

As said previously, the order of items in a dictionary is unpredictable.

### Creating, initializing values during run time (Dynamic allocation)

We can create a dictionary during run time also by using dict () function. This way of creation is called dynamic allocation. Because, during the run time, memory keys and values are added to the dictionary.

{: .info .note}
**Write a program to input total number of sections and class teachers’ name in 11 th class and display all information on the output screen.**

```py
classxi=dict()
n=input("Enter total number of section in xi class")
i=1

while i<=n:
	a=raw_input("enter section")
	b=raw_input ("enter class teacher name")
	classxi[a]=b
	i=i+1


print "Class","\t","Section","\t","teacher name"
for i in classxi:
	print "XI","\t",i,"\t",classxi[i]
```


### Appending values to the dictionary

We can add new elements to the existing dictionary, extend it with single pair of values or join two dictionaries into one. If we want to add only one element to the dictionary, then we should use the following method.

**Syntax:**

```py
dictionary_name [key]=value
```
Example:

```py
>>> a={"mon":"monday","tue":"tuesday","wed":"wednesday"}
>>> a["thu"]="thursday"
>>> print a
{'thu': 'thursday', 'wed': 'wednesday', 'mon': 'monday', 'tue': 'tuesday'}
```

### Merging dictionaries: An update()

Two dictionaries can be merged in to one by using `update()` method. It merges the keys and values of one dictionary into another and overwrites values of the same key.

**Syntax**:

```py
Dic_name1.update (dic_name2)
```

Using this `dic_name2` is added with `Dic_name1`.

Example:

```py
>>> d1={1:10,2:20,3:30}
>>> d2={4:40,5:50}
>>> d1.update(d2)
>>> print d1
{1: 10, 2: 20, 3: 30, 4: 40, 5: 50}
```

Example 2:

```py
{1: 10, 2: 30, 3: 30, 5: 40, 6: 60} # k>>> d1={1:10,2:20,3:30} # key 2 value is 20
>>> d2={2:30,5:40,6:60} #key 2 value is 30
>>> d1.update(d2)
>>> print d1
# key 2 value is replaced with 30 in d1
```

### Removing an item from dictionary

We can remove item from the existing dictionary by using `del` key word.

**syntax**:

```py
del dicname[key]
```

Example:

```py
>>> A={"mon":"monday","tue":"tuesday","wed":"wednesday","thu":"thursday"}
>>> del A["tue"]
>>> print A
{'thu': 'thursday', 'wed': 'wednesday', 'mon': 'monday'}
```

### Dictionary functions and methods

#### cmp()

This is used to check whether the given dictionaries are same or not. If both are same, it will return `zero`, otherwise return `1` or `-1`. If the first dictionary having more number of items, then it will return 1, otherwise return -1.

**Syntax**:

```py
cmp(d1,d2) # d1and d2 are dictionary.
returns 0 or 1 or -1
```

Example:

```py
>>> D1={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D2={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D3={'mon':'Monday','tue':'Tuesday','wed':'Wednesday'}
>>> cmp(D1,D3) #both are not equal
1
>>> cmp(D1,D2) #both are equal
0
>>> cmp(D3,D1)
-1
```

#### len()

This method returns number of key-value pairs in the given dictionary.

**Syntax**:

```py
len(d) # d dictionary
```

#### clear()

It removes all items from the particular dictionary.

Example:

```py
>>> D={'mon':'Monday','tue':'Tuesday','wed':'Wednesday'}
>>> print D
{'wed': 'Wednesday', 'mon': 'Monday', 'tue': 'Tuesday'}
>>> D.clear()
>>> print D
{}
```
#### get(k, x)

There are two arguments `(k, x)` passed in `get()` method. The first argument is `key value`, while the second argument is corresponding `value`. If a dictionary has a given `key (k)`, which is equal to given `value (x)`, it returns the corresponding `value (x)` of given `key (k)`. However, if the dictionary has no `key-value` pair for given `key (k)`, this method returns the default values same as given value `(x)`. The second argument is optional. If omitted and the dictionary has no key equal to the given key value, then it returns `None`.

**syntax**:

```py
D.get (k, x) # D dictionary, k key and x value
```

Example:

```py
>>> D={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D.get('wed',"wednesday") # corresponding value wed
'Wednesday'
>>> D.get("fri","monday") # default value of fri
'Friday'
>>> D.get("mon") # default value of mon
'Monday'
>>> D.get("ttu") # None
>>>
```

#### has_key()

This function returns `True`, if dictionary has a key, otherwise it returns `False`.

**syntax**:

```py
D.has_key(k) #D dictionary and k key
```

#### items()

It returns the content of dictionary as a list of key and value. The key and value pair will be in the form of a tuple, which is not in any particular order.

**syntax**:

```py
D.items() # D dictionary
```

Example:

```py
>>> D={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D.items()
[('wed', 'Wednesday'), ('sun', 'Sunday'), ('thu', 'Thursday'), ('tue', 'Tuesday'), ('mon','Monday'), ('fri', 'Friday'), ('sat', 'Saturday')]
```
> **Note**: `items()` is different from `print` command because, in print command dictionary values are written in `{}`

#### keys()

It returns a list of the key values in a dictionary, , which is not in any particular order.

**Syntax**:

```py
D.keys( ) #D dictionary
```
Example:

```py
>>> D={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D.keys()
['wed', 'sun', 'thu', 'tue', 'mon', 'fri', 'sat']
>>>
```

#### values()

It returns a list of values from `key-value` pairs in a dictionary, which is not in any particular order. However, if we call both the items() and values() method without changing the dictionary's contents between these two (items() and values()), Python guarantees that the order of the two results will be the same.

**syntax**:

```py
D.values() # D values
```
Example:

```py
>>> D={'sun':'Sunday','mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday'}
>>> D.values()
['Wednesday', 'Sunday', 'Thursday', 'Tuesday', 'Monday', 'Friday', 'Saturday']
>>> D.items()
[('wed', 'Wednesday'), ('sun', 'Sunday'), ('thu', 'Thursday'), ('tue', 'Tuesday'), ('mon', 'Monday'), ('fri', 'Friday'), ('sat', 'Saturday')]
```

### Get  key by value in dictionary

Basically we need to separate the dictionary's value in a list, find the position of the value you have and get the key at the position.

Example:

```py
>>> myDict
{'age': 20, 'college': 'Army Institute of Technology', 'name': 'amit'}
>>> myDict.keys()[myDict.values().index('amit')]
'name'
>>> 
```

> **NOTE**: From python3, we need to cast the dic.keys() and dic.values() in list() explicitly.

With the help of `index()` function we get the index of particular item passed as argument.

To find the value of a particular key, you can also iterate over keys (but that's not a good idea).

Thank you 👏
