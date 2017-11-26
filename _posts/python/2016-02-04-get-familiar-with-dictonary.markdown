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

<div class="note info">
  <h5>PyCon 2010: The Mighty Dictionary about how CPython dict works</h5>
</div>


<div class="videoWrapper" >
     <iframe src="https://www.youtube.com/watch?v=C4Kc8xzcA68?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

or

<div class="note info">
  <h5>Brandon Rhodes The Dictionary Even Mightier PyCon 2017</h5>
</div>

<div class="videoWrapper" >
     <iframe src="https://youtu.be/66P5FMkWoVU?rel=0" frameborder="0" allowfullscreen></iframe>
</div>


Note that as of Python 3.3, a random hash seed is used as well, making hash collisions unpredictable to prevent certain types of denial of service (where an attacker renders a Python server unresponsive by causing mass hash collisions). This means that the order of a given dictionary is then also dependent on the random hash seed for the current Python invocation.

Python 2.7 and newer also provides an [OrderedDict class](https://docs.python.org/2/library/collections.html#collections.OrderedDict), a subclass of dict that adds an additional data structure to record key order. At the price of some speed and extra memory, this class remembers in what order you inserted keys; listing keys, values or items will then do so in that order. It uses a doubly-linked list stored in an additional dictionary to keep the order up-to-date efficiently.























Thank you 👏
