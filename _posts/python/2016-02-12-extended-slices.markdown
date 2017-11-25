---
title: 'Extended slices'
date: 2016-02-12 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---

This opeartor operates on all kind of sequences.

Suppose that you wanna extrace the elements of list that have even indices:

```sh
>>> L = range(10)
>>> L[::2]
[0, 2, 4, 6, 8]
```

`-ve` value also work to make a copy of the same list in reverse order.

```sh
>>> L = range(10)
>>> L[::-1]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

This also works for tupples and lists.

**NOTE**: There are some differences between assignments to extended and regular slices. Assignment can only be done in case of mutable sequences.

```sh
>>> a = range(3)
>>> a
[0, 1, 2]
>>> a[1:3] = [4, 5, 6]
>>>a
[0, 4, 5, 6]
```

Extended slice is not this flexible, when assigning to an extended slice, the list on the right hand side of the statement must contain the same number of items as the slice it is replacing.

```sh
>>> a = range(4)
>>> a
[0, 1, 3, 4]
>>> a[::2]
[0, 2]
>>> a[::2] = [0, -1]
>>> a
[0, 1, -1, 3]
```

Thank you 🎂 👏
