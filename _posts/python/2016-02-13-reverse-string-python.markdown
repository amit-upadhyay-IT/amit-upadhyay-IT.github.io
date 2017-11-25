---
title: 'Reverse string Python'
date: 2016-02-13 12:01:40 +0200
author: amit-upadhyay-it
categories: [python]
---

str = 'Amit Upadhyay'

{: .info .note}
**Approach 1:**

```py
print str[::-1]
```

{: .info .note}
**Approach 2:**

```py
"".join(reversed(str))
```
It requires calling a string method `str.join` on another called function, which canbe rather slow.


{: .info .note}
**Approach 3:**

```py
def reverseString (str):
    newStr = ""
    index = len(str)

    while index:
        index -= 1
        newStr += str[index]
    return newStr;


print reverseString("Amit Upadhyay")
```

This is bad because strings are immutable. So every time you are appending a new character, which is creating a new string. So it is better to collect your substring in a list and join them later. This moves us to the approach 4.

{: .info .note}
**Approach 4:**

```py
def reverseString (str):
    newList = []
    index = len(str)

    while index:
        index -= 1
        newList.append(str[index])
    return "".join(newList);


print reverseString("Amit Upadhyay")
```

Thank you 👏
