---
layout: tutorials
permalink: /tutorials/exhaustive-search/
title: Exhaustive Search
---

{: .info .note}
**Exploring every possible combination from a set of choices or values.**

The linear search is also an example of exhaustive search because here we are looking on all the numbers present in the list. Sometimes its hard to enumerate all of the choices. For example: printing all possible groups in a list of integers where each group may consists upto 15 elements.

Recursion is a really good algorithmic pattern for performing exhaustive search.

Famous application:- Producing all permutations of a set of values.

### General pattern:

**What is prefix below?**

It is some data storage entity, it can be a string or a vector and any other type which may store one of the possible output in some call stack out of many call stacks.

```yml
Search(decisions, prefix):
  - if there are no more decisions to make: stop and print prefix
  - else, lets handle one decision ourselves i.e. update prefix (as prefix
    is the one which stores one of the possiblities), and rest by recursions
    for each available choice C for this decision.
      - choose C and add or append it to prefix.
      - Search the remaining decisions that could follow C.
```

- Often the search space consists of many decisions, each of which has several available choices. Example: When enumerating all 5-letter string, each of the 5-letter is a decision, and each of those decision has 26 possible choices.


## Example 1: print binary

{: .info .note}
Write a recursive function print_binary that accepts an integer number of digits and prints all binary number that have exactly that many digits.

If input = 3,

then, output:

```
000
001
010
011
100
101
110
111
```
